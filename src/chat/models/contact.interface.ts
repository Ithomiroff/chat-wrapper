export interface IContact {
  // Имя
  firstName?: string;

  // Фамилия
  lastName?: string;

  // Уникальный идентификатор пользователя
  userId: string;

  // Последнее сообщение в переписке между вами и этим пользователем
  lastMessage?: IMessage;
}

export class IMessage {

  id: string;
  // Уникальный идентификатор пользователя. Может быть сравнен с MessagingService::getCurrentUserId,
  // чтобы определить вы послали или вам.
  userId: string;

  // Текст сообщения
  text?: string;

  read?: boolean;

  time: number;
}

export interface IContactExtend extends IContact {
  hidden: false;
}
