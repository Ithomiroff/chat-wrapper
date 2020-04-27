import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, combineLatest} from 'rxjs';
import {IContact, IContactExtend} from '../models/contact.interface';
import {ChatService} from './chat.service';
import {catchError, finalize, map} from 'rxjs/operators';
import {UserNamePipe} from '../pipes/user-name.pipe';
import {AbstractChat} from './common.state';

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
    const equals = b.lastMessage.time === a.lastMessage.time;
    if (equals) {
      return 0;
    }
    return b.lastMessage.time - a.lastMessage.time;
  }

  private sortName = (a: IContact, b: IContact): number => {
    if (b.firstName > a.firstName) {
      return -1;
    }
    return 1;
  }

  private sortContacts = (a: IContact, b: IContact): number => {
    let comparison = 0;

    if (!a.lastMessage.read && b.lastMessage.read) {
      comparison = -1;
    }
    if (a.lastMessage.read && !b.lastMessage.read) {
      comparison = 1;
    }
    if (
      (a.lastMessage.read && b.lastMessage.read) ||
      (!a.lastMessage.read && !b.lastMessage.read)
    ) {
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

}
