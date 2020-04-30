import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IChat, IContact, IMessage } from '../../models/contact.interface';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContentComponent {

  @Input('selectedChat')
  set chat(value: IChat) {
    if (!value) {
      return;
    }
    this.selectedChat = value;

    this.scroll();
  }

  selectedChat: IChat;

  @Input() selectedUserChat: IContact;

  @Input() loadingChat: boolean;

  @Input() messages: IMessage[];

  @Input() currentUser: IContact;

  icon = faComments;

  @ViewChild('wrapper') wrapperEl: ElementRef;

  constructor() {
  }

  trackFn = (index): number => index;

  scroll = () => {
    const ref = this.wrapperEl && this.wrapperEl.nativeElement;
    if (!ref) {
      return;
    }
    ref.scrollTop = ref.scrollHeight;
  }

}
