import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-messager',
  templateUrl: './chat-messager.component.html',
  styleUrls: ['./chat-messager.component.scss']
})
export class ChatMessagerComponent implements OnInit {

  icon = faPaperPlane;

  iconTriangle = faExclamationTriangle;

  constructor() { }

  ngOnInit(): void {
  }

}
