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
    this.loading.next(true);
    const sub = this.chatService.getMessages(user.userId)
      .pipe(
        map((messages: IMessage[]) => {
          if (messages) {
            this.messages.next(messages);
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

  public selectChat(contact: IContact): void {
    if (!contact) {
      return;
    }
    this.selectedContactChat.next(contact);

    const chat = new ContactChat(contact.userId);
    const currentChats = this.chats.getValue();
    currentChats.push(chat);
    this.chats.next(currentChats);

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
        return chats.find(c => c.contactUserId === contact.userId);
      }),
      tap((c) => console.warn(c))
    );
  }

  public addTypingMessage(message: string): void {
    const currentUser = this.selectedContactChat.getValue();
    const chats = this.chats.getValue();
    const chat = chats.find((c) => c.contactUserId === currentUser.userId);
    chat.typingMessage = message;
    chats.push(chat);
    this.chats.next(chats);
  }

}
