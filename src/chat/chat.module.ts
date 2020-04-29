import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatComponent} from './components/chat/chat.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {ChatContentComponent} from './components/chat-content/chat-content.component';
import {UserPanelComponent} from './components/user-panel/user-panel.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { LoaderHolderComponent } from './components/loader-holder/loader-holder.component';
import { ChatContentHeaderComponent } from './components/chat-content-header/chat-content-header.component';
import { ChatMessagerComponent } from './components/chat-messager/chat-messager.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ChatService} from './services/chat.service';
import {ChatContactsStateService} from './services/chat-contacts-state.service';
import { MessagePipe } from './pipes/message.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import {ChatMessageStateService} from './services/chat-message-state.service';


@NgModule({
  declarations: [
    ChatComponent,
    UserListComponent,
    ChatContentComponent,
    UserPanelComponent,
    UserSearchComponent,
    LoaderHolderComponent,
    ChatContentHeaderComponent,
    ChatMessagerComponent,
    MessagePipe,
    UserNamePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ChatComponent,
  ],
  providers: [
    ChatService,
    ChatContactsStateService,
    ChatMessageStateService
  ]
})
export class ChatModule {
}
