import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-content-header',
  templateUrl: './chat-content-header.component.html',
  styleUrls: ['./chat-content-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContentHeaderComponent implements OnInit {

  userIcon = faUserCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
