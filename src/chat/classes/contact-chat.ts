import {IMessage} from '../models/contact.interface';


export class ContactChat {

  private savedMessage: string;

  private loading: boolean;

  private readonly contactId: string;

  private messagesList: IMessage[] = [];

  constructor(
    contactId: string
  ) {
    this.contactId = contactId;
  }

  set typingMessage(value: string) {
    this.savedMessage = value;
  }

  get typingMessage(): string {
    return this.savedMessage;
  }

  set loadingState(value: boolean) {
    this.loading = value;
  }

  set addMessage(value: IMessage) {
    this.messagesList.push(value);
  }

  get messages(): IMessage[] {
    return this.messagesList;
  }

  get contactUserId(): string {
    return this.contactId;
  }

}
