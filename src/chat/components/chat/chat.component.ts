import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PanelType} from '../user-panel/user-panel.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  loadingUser$ = new BehaviorSubject<boolean>(true);

  error$ = new BehaviorSubject<boolean>(false);

  panelMode: PanelType = 'default';

  errorMessageUserList = `Не удалось загрузить пользователей`;

  errorMessageChat = `Не удалось загрузить переписку с пользователем`;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingUser$.next(false);
      // this.error$.next(true)
    }, 1500);
  }

  onTogglePanelMode() {
    this.panelMode = this.panelMode === 'default' ? 'search' : 'default';
  }

  onChangeSearchValue($event: string) {
    console.warn($event);
  }
}
