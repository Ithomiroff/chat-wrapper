import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent implements OnInit, OnDestroy {

  @Output() changeValue = new EventEmitter<string>();

  @Output() closeInputMode = new EventEmitter<void>();

  userControl: FormControl = new FormControl('');

  private sub: Subscription;

  arrowIcon = faArrowLeft;

  closeIcon = faTimes;

  ngOnInit(): void {
    this.sub = this.userControl.valueChanges.pipe(
      debounceTime(500),
      map((value) => this.changeValue.emit(value))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  clear() {
    if (this.userControl.value && this.userControl.value.length < 1) {
      return;
    }
    this.userControl.setValue('');
  }
}
