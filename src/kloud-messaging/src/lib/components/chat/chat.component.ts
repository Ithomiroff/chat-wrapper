import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messaging-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any[];

  constructor() {
    this.messages = [];
   }

  ngOnInit(): void {
    for (let i = 0; i < 100; ++i) {
      this.messages.push({text: 'Message #' + i});
    }
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    //const botReply = this.chatShowcaseService.reply(event.message);
    const botReply = {text: 'Reply on ' + event.message, user: event.user };
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }
}
