import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {IContact} from '../../models/contact.interface';

@Component({
  selector: 'app-chat-content-header',
  templateUrl: './chat-content-header.component.html',
  styleUrls: ['./chat-content-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContentHeaderComponent {

  @Input() contact: IContact;

  userIcon = faUserCircle;

}
