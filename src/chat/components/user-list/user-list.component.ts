import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PanelType} from '../user-panel/user-panel.component';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {IContact, IContactExtend} from '../../models/contact.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() contacts: IContactExtend[];

  @Input() selectedUserChat: IContact;

  @Input() currentUser: IContact;

  @Input() headerPanelMode: PanelType;

  @Output() changeModeHeader = new EventEmitter<void>();

  @Output() selectUserId = new EventEmitter<string>();

  userIcon = faUserCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

  trackByFn = (index, item: IContact) => item.userId;

}
