import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';


export class AbstractChat {

  protected readonly loading = new BehaviorSubject<boolean>(false);

  protected readonly error = new BehaviorSubject<boolean>(false);

  protected readonly subs: Subscription[] = [];


  protected destroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<boolean> {
    return this.error.asObservable();
  }

  get allowActions$(): Observable<boolean> {
    return combineLatest([
      this.loading$,
      this.error$
    ])
      .pipe(
        map((params) => params.every(p => !p))
      );
  }
}
