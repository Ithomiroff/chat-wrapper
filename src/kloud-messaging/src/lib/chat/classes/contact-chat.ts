import {IMessage} from '../models/contact.interface';


export class ContactChat {

  public savedMessage: string;

  public loading: boolean;

  private readonly contactId: string;

  public messagesList: IMessage[] = [];

  constructor(
    contactId: string
  ) {
    this.contactId = contactId;
    this.savedMessage = '';
    this.loading = false;
  }

  get contactUserId(): string {
    return this.contactId;
  }

}
