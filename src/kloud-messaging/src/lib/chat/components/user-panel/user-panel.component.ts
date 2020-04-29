import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {

  @Input() allowActions: boolean;

  @Input() mode: PanelType = 'default';

  @Output() changeMode = new EventEmitter<void>();

  @Output() changeSearchValue = new EventEmitter<string>();

  menuIcon = faBars;

  searchIcon = faSearch;

  onChange = (): void => this.allowActions && this.changeMode.emit();
}

export type PanelType = 'search' | 'default';
