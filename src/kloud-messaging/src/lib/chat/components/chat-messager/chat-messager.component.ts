import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class ChatMessagerComponent implements OnInit, OnDestroy {

  @Input('selectedChat')
  set chat(value: ContactChat) {
    if (!value) {
      return;
    }
    this.selectedChat = value;

    this.messageControl.setValue(value.savedMessage);
  }

  selectedChat: ContactChat;

  @Input() visible: boolean;

  @Output() changeMessage = new EventEmitter<string>();

  @Output() sendMessage = new EventEmitter<void>();

  textRows$ = new BehaviorSubject<number>(1);

  messageControl: FormControl = new FormControl('');

  icon = faPaperPlane;

  iconTriangle = faExclamationTriangle;

  sub: Subscription;

  constructor() { }

  updateRows = (value: string): void => {
    const rows = value.split('\n');
    this.textRows$.next(rows.length > 4 ? 5 : rows.length);
  };

  ngOnInit(): void {
    this.sub = this.messageControl.valueChanges
      .pipe(
        map((value: string) => {
          this.updateRows(value);
          this.changeMessage.emit(value);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  onSend($event: Event) {
    $event.preventDefault();
    this.sendMessage.emit();
  }
}
