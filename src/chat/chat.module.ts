import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
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


@NgModule({
  declarations: [
    ChatComponent,
    UserListComponent,
    ChatContentComponent,
    UserPanelComponent,
    UserSearchComponent,
    LoaderHolderComponent,
    ChatContentHeaderComponent,
    ChatMessagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule {
}
