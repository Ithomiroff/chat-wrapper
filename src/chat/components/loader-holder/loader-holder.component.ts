import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

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
}

