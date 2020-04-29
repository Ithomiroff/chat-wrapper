import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ListboxModule} from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { MessagingService } from './services/messaging.service'; 8
import {ChatModule} from './chat/chat.module';
import {ChatComponent} from './chat/components/chat/chat.component';

export const MessagingApiBaseUrl = new InjectionToken<string>('<MessagingApiBaseUrl>');

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: ChatComponent },
      { path: '**', redirectTo: '' },
    ]),
    ListboxModule,
    FormsModule,
    ChatModule
  ],
  providers: [
    HttpClient,
    MessagingService
  ],
  exports: [],
})
export class KloudMessagingModule { }
