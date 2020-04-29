import {IMessage} from '../models/contact.interface';


export class ContactChat {

  public savedMessage: string;

  public loading: boolean;

  public error: boolean;

  public readonly contactId: string;

  public messagesList: IMessage[] = [];

  constructor(
    contactId: string
  ) {
    this.contactId = contactId;

    this.savedMessage = '';
    this.loading = false;
    this.error = false;
  }
}
