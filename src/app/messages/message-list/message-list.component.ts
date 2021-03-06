import { Component, OnInit } from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messageData) => {
      this.messages = messageData;
    });
    // console.log('list message ' + this.messages);
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
    // console.log(message);
  }
}
