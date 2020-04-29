import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faExclamationTriangle, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {ContactChat} from '../../classes/contact-chat';

@Component({
  selector: 'app-chat-messager',
  templateUrl: './chat-messager.component.html',
  styleUrls: ['./chat-messager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagerComponent implements OnInit {

  @Input() selectedChat: ContactChat;

  @Input() visible: boolean;

  @Output() changeMessage = new EventEmitter<string>();

  textRows$ = new BehaviorSubject<number>(1);

  messageControl: FormControl = new FormControl('');

  icon = faPaperPlane;

  iconTriangle = faExclamationTriangle;

  constructor() { }

  ngOnInit(): void {
    this.messageControl.valueChanges
      .pipe(
        map((value: string) => {
          const rows = value.split('\n');
          this.textRows$.next(rows.length > 4 ? 5 : rows.length);

          this.changeMessage.emit(value);
        })
      )
      .subscribe();
  }

  onSend($event: Event) {
    $event.preventDefault();
    console.warn(123);
  }
}
