import { Component, OnInit } from '@angular/core';
import { MessagingService, ContactUi } from '../../services/messaging.service';

@Component({
  selector: 'messaging-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: ContactUi[] = [];

  selectedUser: any;

  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.messagingService.getContacts().subscribe(contacts => {
      this.users = contacts.map(contact => {
        return { fullName: contact.firstName + contact.lastName };
      });
    });
  }

}
