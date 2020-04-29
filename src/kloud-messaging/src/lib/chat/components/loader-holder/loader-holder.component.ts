import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader-holder',
  templateUrl: './loader-holder.component.html',
  styleUrls: ['./loader-holder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderHolderComponent {

  @Input() loading: boolean;

  @Input() error: boolean;

  @Input() errorMessage: string;

  icon = faExclamationCircle;
}

