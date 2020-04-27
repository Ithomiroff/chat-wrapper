import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagerComponent } from './chat-messager.component';

describe('ChatMessagerComponent', () => {
  let component: ChatMessagerComponent;
  let fixture: ComponentFixture<ChatMessagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
