import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContentHeaderComponent } from './chat-content-header.component';

describe('ChatContentHeaderComponent', () => {
  let component: ChatContentHeaderComponent;
  let fixture: ComponentFixture<ChatContentHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
