import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
export class UserSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() changeValue = new EventEmitter<string>();

  @Output() closeInputMode = new EventEmitter<void>();

  @ViewChild('input') input;

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

  ngAfterViewInit(): void {
    this.input && this.input.nativeElement && this.input.nativeElement.focus();
  }

  clear() {
    if (this.userControl.value && this.userControl.value.length < 1) {
      return;
    }
    this.userControl.setValue('');
    this.input.nativeElement.focus();
  }
}
