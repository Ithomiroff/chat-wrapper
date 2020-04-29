import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, timer } from 'rxjs';
import {IMessage} from '../chat/models/contact.interface';

// Контакт, доступный текущему пользователю
export class Contact {
  // Имя
  firstName?: string;

  // Фамилия
  lastName?: string;

  // Уникальный идентификатор пользователя
  userId: string;

  // Последнее сообщение в переписке между вами и этим пользователем
  lastMessage?: ILastMessage;
}

// Класс для хранения состояния  сообщения между текущим пользователем и собеседником
export class CurrentMessageState {
  // Текст в поле сообщения
  text?: string;

  // Флаг ошибки, если она возникла в процессе отправки
  error: boolean;

  // Флаг индикации того, сто сообщение в процессе отправки
  sendInProgress: boolean;
}

export class ILastMessage {
  // Уникальный идентификатор пользователя. Может быть сравнен с MessagingService::getCurrentUserId,
  // чтобы определить вы послали или вам.
  userId: string;

  // Текст сообщения
  text?: string;
}

export class Message implements ILastMessage {
  userId: string;
  text?: string;

  // Дата и время отправки сообщения
  timestampUtc: number;
}

// Модель для хранения состояния каждого контакта.
export class ContactUi {
  // Полное имя, сформированное в соответствии с документацией
  fullName: string;

  // Последнее сообщение в переписке между вами и этим пользователем
  lastMessage?: ILastMessage;

  // Состояние написания/отправки текущего сообщения. Используется при смене активных собеседником до или во время отправки.
  currentMessageState?: CurrentMessageState;
}

@Injectable({
  providedIn: 'root',
})
export class MessagingService {

  private readonly maxContacts = 12;

  constructor() {
    // Симуляция прихода новых сообщений.
    // Возможна ситуация, когда сообщение приходит от пользователя, не входящего в контакты (если контакт
    // был добавлен с системе после того, как чат запросил список пользователей из Backend).
    timer(1000, 1500).subscribe((_) => {
      const contactIndex = Math.round(Math.random() * this.maxContacts + 10 /* имитация получения сообщения от контакта не из списка */);
      const userId = this.createUserId(contactIndex);

      this.messageReceived.emit(this.createMessage('1'));
    });
  }

  // Канал приёма новых сообщений.
  @Output() messageReceived = new EventEmitter<IMessage>();

  // Уникальный идентификатор текущего пользователя. Используется для определения вы ли отправили сообщение или вам.
  getCurrentUserId() {
    return '_me_';
  }

  // Отсылает сообщение пользователю.
  // Может вернуть ошибку в примерно 50% случаев (для симуляции).
  sendMessage(message: Message) {
    return new Observable((observer) => {
      timer(1000).subscribe((_) => {
        if (this.shouldFail) {
          observer.error('Failed send message');
        } else {
          observer.next();
        }
      });
    });
  }

  // Запрашивает сообщения для конкретного пользователя.
  // Может вернуть ошибку в примерно 50% случаев (для симуляции).
  getMessages(userId: string) {
    return new Observable<IMessage[]>((observer) => {
      timer(1000).subscribe((_) => {
        // if (this.shouldFail) {
        //   observer.error('Failed fetch messages');
        // } else {
        // }
        observer.next(this.createMessages(userId));
      });
    });
  }

  // Возвращает список доступных для данного пользователя контактов
  // Метод, в реальности вызывающий Backend. Может вернуть ошибку в примерно 50% случаев (для симуляции).
  getContacts() {
    return new Observable<Contact[]>((observer) => {
      timer(1000).subscribe((_) => {
        // if (this.shouldFail) {
        //   observer.error('Failed fetch contacts');
        // } else {
        // }
        observer.next(this.createContacts());
      });
    });
  }

  private createMessages(userId: string) {
    const messages: IMessage[] = [];

    for (let i = 0; i < 100; ++i) {
      messages.push(this.createMessage(userId));
    }

    return messages;
  }

  private createMessage(userId: string): IMessage {
    const from = Math.random() > 0.5 ? userId : this.getCurrentUserId();

    return {
      userId: from,
      text: 'Тестовое сообщение от ' + userId,
      time: +new Date().getUTCDate(),
      id: '123'
    };
  }

  private get shouldFail() {
    return Math.random() > 0.5;
  }

  private createLastMessage(index: number) {
    switch (index % 3) {
      case 0:
        return null;

      case 1:
        return {
          userId: index.toString(),
          text: 'Сообщение мне от собеседника 12/2/2019',
          read: false,
          time: this.shouldFail ? +new Date('12/2/2019') : +new Date('12/11/2019')
        };

      case 2:
        return {
          userId: this.getCurrentUserId(),
          text: 'Сообщение от меня собеседнику 12/4/2019',
          read: true,
          time: this.shouldFail ? +new Date('12/1/2019') : +new Date('12/8/2019')
        };
    }
  }

  private createContact(index: number) {
    switch (index % 4) {
      case 0:
        return {
          firstName: 'Имя_' + index,
          lastName: 'Фамилия_' + index,
          userId: this.createUserId(index),
          lastMessage: this.createLastMessage(index)
        };
      case 1:
        return {
          lastName: 'Фамилия_' + index,
          userId: this.createUserId(index),
          lastMessage: this.createLastMessage(index)
        };
      case 2:
        return {
          firstName: 'Имя_' + index,
          userId: this.createUserId(index),
          lastMessage: this.createLastMessage(index)
        };
      case 3:
        return {
          userId: this.createUserId(index),
          lastMessage: this.createLastMessage(index)
        };
    }
  }

  private createUserId(index: number) {
    return index.toString();
  }

  private createContacts() {
    const contacts: Contact[] = [];
    for (let i = 0; i < this.maxContacts; ++i) {
      contacts.push(this.createContact(i));
    }

    return contacts;
  }
}
