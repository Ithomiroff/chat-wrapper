import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PanelType} from '../user-panel/user-panel.component';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() headerPanelMode: PanelType;

  @Output() changeModeHeader = new EventEmitter<void>();

  userIcon = faUserCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
