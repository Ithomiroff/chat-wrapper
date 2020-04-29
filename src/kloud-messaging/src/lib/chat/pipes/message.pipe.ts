import { Pipe, PipeTransform } from '@angular/core';
import {IContact, IMessage} from '../models/contact.interface';
import {UserNamePipe} from './user-name.pipe';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  transform(message: IMessage, currentUser: IContact, user: IContact): string {
    if (!currentUser.userId) {
      return message && message.text;
    }
    const pipe = new UserNamePipe();
    if (!message) {
      return '';
    }
    const prefix = message.userId === currentUser.userId ? 'Вы: ' : `${pipe.transform(user)}: `;
    return `${prefix} ${(message && message.text) || ''}`;
  }

}
