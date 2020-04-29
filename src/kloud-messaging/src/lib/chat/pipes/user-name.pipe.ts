import { Pipe, PipeTransform } from '@angular/core';
import {IContact} from '../models/contact.interface';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: IContact): string {
    if (!value) {
      return ;
    }
    const { lastName, firstName } = value;
    if (!lastName && !firstName) {
      return 'Нет имени';
    }
    if (lastName && firstName) {
      return `${firstName} ${lastName}`;
    }
    if (!lastName) {
      return firstName;
    }
    if (!firstName) {
      return lastName;
    }
  }
}
