import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {IContact, IMessage} from '../models/contact.interface';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ChatService {

  readonly prefix = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  getContacts(): Observable<IContact[]> {
    return this.http.get('/api/contacts').pipe(
      map((res) => res as IContact[]),
    );
  }

  getMessages(userId: string): Observable<IMessage[]> {
    return this.http.get('/api/messages/' + userId).pipe(
      map((res) => res as IMessage[]),
    );
  }

}
