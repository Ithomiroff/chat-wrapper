import {Injectable} from '@angular/core';
import {AbstractChat} from './common.state';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {IContact, IMessage} from '../models/contact.interface';
import {ChatService} from './chat.service';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {UserNamePipe} from '../pipes/user-name.pipe';
import {ContactChat} from '../classes/contact-chat';


@Injectable()
export class ChatMessageStateService extends AbstractChat {

  private readonly selectedContactChat = new BehaviorSubject<IContact>(null);

  private readonly messages = new BehaviorSubject<IMessage[]>([]);

  private chats = new BehaviorSubject<ContactChat[]>([]);

  constructor(
    private chatService: ChatService
  ) {
    super();
  }

  private loadMessages(): void {
    const user = this.selectedContactChat.getValue();
    if (!user) {
      return;
    }
    const chats = this.chats.getValue();
    const chat = chats.find((c) => c.contactUserId === user.userId);

    this.loading.next(true);
    const sub = this.chatService.getMessages(user.userId)
      .pipe(
        map((messages: IMessage[]) => {
          if (messages) {
            chat.messagesList = messages;
            this.chats.next(chats);
            // this.messages.next(messages);
            this.loading.next(false);
          }
        }),
        catchError((err) => {
          this.error.next(true);
          return of(err);
        }),
        finalize(() => this.loading.next(false))
      )
      .subscribe();

    this.subs.push(sub);
  }

  private findChat(contactId): number {
    const currentChats = this.chats.getValue();
    return currentChats.findIndex((c) => c.contactUserId === contactId);
  }

  private findCurrentChat(): number {
    const userId = this.selectedContactChat.getValue()?.userId;
    return this.findChat(userId);
  }

  public selectChat(contact: IContact): void {
    if (!contact) {
      return;
    }

    const chatExist = this.findChat(contact.userId) !== -1;

    if (!chatExist) {
      const newChat = new ContactChat(contact.userId);
      const chats = this.chats.getValue();
      chats.push(newChat);
      this.chats.next(chats);
    }

    this.selectedContactChat.next(contact);

    this.loadMessages();
  }

  get selectedContactChat$(): Observable<IContact> {
    return this.selectedContactChat.asObservable();
  }

  get messages$(): Observable<IMessage[]> {
    return this.messages.asObservable();
  }

  get allowPrintMessage$(): Observable<boolean> {
    return combineLatest([
      this.loading$,
      this.error$,
      this.selectedContactChat$
    ]).pipe(
      map(([loading, error, selectedContact]) => {
        return !loading && !error && !!selectedContact;
      })
    );
  }

  get errorMessage$(): Observable<string> {
    return this.selectedContactChat$.pipe(
      map((contact) => {
        const user = new UserNamePipe().transform(contact);
        return `Не удалось загрузить переписку с пользователем ${user}`;
      })
    );
  }

  get currentChat$(): Observable<ContactChat> {
    return combineLatest([
      this.chats,
      this.selectedContactChat$
    ]).pipe(
      map(([chats, contact]) => {
        return chats.find(c => contact && c.contactUserId === contact.userId);
      }),
    );
  }

  public addTypingMessage(value: string): void {
    const chatIndex = this.findCurrentChat();
    const chats = this.chats.getValue();
    const chat = chats[chatIndex];

    if (chat) {
      chat.savedMessage = value;
    }

    this.chats.next(chats);
  }

  public send(): void {
    const chatIndex = this.findCurrentChat();
    const chats = this.chats.getValue();
    const chat = chats[chatIndex];
    chat.loading = true;

    this.chats.next(chats);
  }

  public listenNewMessages(): Observable<IMessage> {
    return this.chatService.newMessages();
  }

}
