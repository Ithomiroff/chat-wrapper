import {Injectable} from '@angular/core';
import {AbstractChat} from './common.state';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IContact, IMessage} from '../models/contact.interface';
import {ChatService} from './chat.service';
import {catchError, finalize, map} from 'rxjs/operators';

@Injectable()
export class ChatMessageStateService extends AbstractChat {

  private readonly selectedContactChat = new BehaviorSubject<IContact>(null);

  private readonly messages = new BehaviorSubject<IMessage[]>([]);

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
    this.loadMessages();
  }

  get selectedContactChat$(): Observable<IContact> {
    return this.selectedContactChat.asObservable();
  }

  get messages$(): Observable<IMessage[]> {
    return this.messages.asObservable();
  }

}
