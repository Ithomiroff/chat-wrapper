import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {IContact, IMessage} from '../models/contact.interface';
import {catchError, map} from 'rxjs/operators';
import {MessagingService} from "../../services/messaging.service";

@Injectable()
export class ChatService {

  readonly prefix = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private messagingService: MessagingService
  ) {
  }

  sendMessage(text: IMessage): Observable<any> {
    return this.messagingService.sendMessage(text);
  }

  getContacts(): Observable<IContact[]> {
    // return this.http.get('/api/contacts').pipe(
    //   map((res) => res as IContact[]),
    // );
    return this.messagingService.getContacts().pipe(
      map((res) => res as IContact[])
    );
  }

  getMessages(userId: string): Observable<IMessage[]> {
    return this.messagingService.getMessages(userId).pipe(
      map((res) => res as IMessage[]),
    );
    // return this.http.get('/api/messages/' + userId).pipe(
    //   map((res) => res as IMessage[]),
    // );
  }

  newMessages(): Observable<IMessage> {
    return this.messagingService.messageReceived;
  }

}
