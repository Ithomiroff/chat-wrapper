import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IContact, IMessage} from '../../models/contact.interface';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {ContactChat} from '../../classes/contact-chat';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {

  @Input() selectedChat: ContactChat;

  @Input() selectedUserChat: IContact;

  @Input() loadingChat: boolean;

  @Input() messages: IMessage[];

  @Input() currentUser: IContact;

  icon = faComments;

  constructor() {
  }

  ngOnInit(): void {
  }

  trackFn = (index, msg: IMessage): string => msg.id;

}
