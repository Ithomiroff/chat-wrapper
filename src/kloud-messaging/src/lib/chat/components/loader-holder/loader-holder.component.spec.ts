import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderHolderComponent } from './loader-holder.component';

describe('LoaderHolderComponent', () => {
  let component: LoaderHolderComponent;
  let fixture: ComponentFixture<LoaderHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
