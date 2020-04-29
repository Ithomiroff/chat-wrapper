import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IContact, IContactExtend, IMessage} from '../models/contact.interface';
import {ChatService} from './chat.service';
import {catchError, finalize, map} from 'rxjs/operators';
import {UserNamePipe} from '../pipes/user-name.pipe';
import {AbstractChat} from './common.state';
import {ILastMessage} from "../../services/messaging.service";

@Injectable()
export class ChatContactsStateService extends AbstractChat {

  private readonly contacts = new BehaviorSubject<IContactExtend[]>([]);

  public readonly currentUser: IContact = {
    firstName: 'Victor',
    lastName: 'Superhero',
    userId: '5'
  };

  constructor(
    private chatService: ChatService
  ) {
    super();
    this.loadContacts();
  }

  private loadContacts(): void {
    this.loading.next(true);
    const sub = this.chatService.getContacts()
      .pipe(
        map((contacts: IContact[]) => {
          if (contacts) {
            const adapter: IContactExtend[] = contacts.map((contact) => ({...contact, hidden: false}));
            this.contacts.next(adapter);
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

  public filterContacts(value: string): void {
    const val = value ? value.toLocaleLowerCase() : '';
    const pipe = new UserNamePipe();
    let contacts: IContactExtend[] = this.contacts.getValue() || [];
    contacts = contacts.map((contact: IContactExtend) => {
      return {
        ...contact,
        hidden: pipe.transform(contact).toLocaleLowerCase().indexOf(val) < 0
      };
    }) as IContactExtend[];
    this.contacts.next(contacts);
  }

  private sortDate = (a: IContact, b: IContact): number => {
    const getTime = (c: IContact): number => {
      return c && c.lastMessage && c.lastMessage.time;
    };
    if (
      (!getTime(a) && !getTime(b)) ||
      (getTime(a) && getTime(b)) && getTime(a) === getTime(b)
    ) {
      return 0;
    }

    if (getTime(a) && !getTime(b)) {
      return -1;
    }

    if (getTime(b) && !getTime(a)) {
      return 1;
    }

    return getTime(b) - getTime(a);
  }

  private sortName = (a: IContact, b: IContact): number => {
    if (b.firstName > a.firstName) {
      return -1;
    }
    return 1;
  }

  private sortStatus = (a: IContact, b: IContact): number => {

    const getReadStatus = (c: IContact): IMessage | {} => {
      return c && c.lastMessage ? c.lastMessage.read : {};
    };

    if (!getReadStatus(a) && !getReadStatus(b)) {
      return 0;
    }

    if (!getReadStatus(a) && getReadStatus(b)) {
      return -1;
    }

    if (getReadStatus(a) && !getReadStatus(b)) {
      return 1;
    }

    if (getReadStatus(a) && getReadStatus(b)) {
      return 0;
    }


    return 1;
  }

  private sortContacts = (a: IContact, b: IContact): number => {
    let comparison = this.sortStatus(a, b);

    if (comparison === 0) {
      comparison = this.sortDate(a, b);
      if (comparison === 0) {
        comparison = this.sortName(a, b);
      }
    }

    return comparison;
  };

  get contacts$(): Observable<IContactExtend[]> {
    return this.contacts.asObservable()
      .pipe(
        map((contacts: IContactExtend[]) => contacts.sort(this.sortContacts)),
      );
  }

  public findContact(userId: string): IContact {
    return this.contacts.getValue().find((c) => c.userId === userId);
  }

  public updateContactList(msg: IMessage): void {
    const contacts = this.contacts.getValue();
    const contact = contacts.find(c => c.userId === msg.userId);
    if (!contact) {
      return;
    }
    contact.lastMessage = msg;
    this.contacts.next(contacts);
  }

}
