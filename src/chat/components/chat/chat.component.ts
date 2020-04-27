import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PanelType} from '../user-panel/user-panel.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatContactsStateService} from '../../services/chat-contacts-state.service';
import {IContact, IContactExtend} from '../../models/contact.interface';

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

  currentUser: IContact = this.chatContacts.currentUser;

  panelMode: PanelType = 'default';

  errorMessageUserList = `Не удалось загрузить пользователей`;

  errorMessageChat = `Не удалось загрузить переписку с пользователем`;

  constructor(
    private chatContacts: ChatContactsStateService
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
}
