import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUsersComponent } from './users.component';

describe('MyUsersComponent', () => {
  let component: MyUsersComponent;
  let fixture: ComponentFixture<MyUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
