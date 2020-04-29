import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PanelType} from '../user-panel/user-panel.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatContactsStateService} from '../../services/chat-contacts-state.service';
import {IContact, IContactExtend, IMessage} from '../../models/contact.interface';
import {ChatMessageStateService} from '../../services/chat-message-state.service';
import {combineLatest} from 'rxjs/operators';
import {ContactChat} from '../../classes/contact-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  contacts$: Observable<IContactExtend[]> = this.chatContacts.contacts$;

  loadingContacts$: Observable<boolean> = this.chatContacts.loading$;

  errorContacts$: Observable<boolean> = this.chatContacts.error$;

  allowActionsContacts$: Observable<boolean> = this.chatContacts.allowActions$;

  selectedContactChat$: Observable<IContact> = this.chatMessages.selectedContactChat$;

  selectedChat$: Observable<ContactChat> = this.chatMessages.currentChat$;

  loadingChat$: Observable<boolean> = this.chatMessages.loading$;

  errorChat$: Observable<boolean> = this.chatMessages.error$;

  messages$: Observable<IMessage[]> = this.chatMessages.messages$;

  allowPrintMessage$: Observable<boolean> = this.chatMessages.allowPrintMessage$;

  currentUser: IContact = this.chatContacts.currentUser;

  panelMode: PanelType = 'default';

  errorMessageUserList = `Не удалось загрузить пользователей`;

  errorMessageChat$: Observable<string> = this.chatMessages.errorMessage$;

  constructor(
    private chatContacts: ChatContactsStateService,
    private chatMessages: ChatMessageStateService
  ) {
  }

  ngOnInit(): void {

  }

  onTogglePanelMode() {
    this.panelMode = this.panelMode === 'default' ? 'search' : 'default';
  }

  onChangeSearchValue($event: string) {
    this.chatContacts.filterContacts($event);
  }

  selectUser(userId: string): void {
    const user = this.chatContacts.findContact(userId);
    if (user) {
      this.chatMessages.selectChat(user);
    }
  }

  onChangeMessage($event: string) {
    this.chatMessages.addTypingMessage($event);
  }
}
