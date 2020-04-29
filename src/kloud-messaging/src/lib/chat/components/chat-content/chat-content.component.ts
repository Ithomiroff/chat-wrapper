import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IContact, IMessage} from '../../models/contact.interface';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {ContactChat} from '../../classes/contact-chat';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent {

  @Input('selectedChat') set chat(value: ContactChat) {
    if (!value) {
      return;
    }
    this.selectedChat = value;

    this.scroll();
  }

  selectedChat: ContactChat;

  @Input() selectedUserChat: IContact;

  @Input() loadingChat: boolean;

  @Input() messages: IMessage[];

  @Input() currentUser: IContact;

  icon = faComments;

  @ViewChild('wrapper') wrapperEl: ElementRef;

  constructor() {
  }

  trackFn = (index, msg: IMessage): string => msg.id;

  scroll = () => {
    const ref = this.wrapperEl && this.wrapperEl.nativeElement;
    if (!ref) {
      return;
    }
    ref.scrollIntoView(false);
    ref.scrollTop = ref.scrollHeight;
    ref.scrollTop = ref.scrollHeight - ref.clientHeight;

  }

}
