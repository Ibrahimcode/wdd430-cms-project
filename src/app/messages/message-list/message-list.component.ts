import { Component, OnInit } from '@angular/core';
import Message from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      1344,
      'Thank you',
      'Thank you for the importants knowledge you shared with us',
      'John'
    ),
    new Message(
      1564,
      'Angular',
      'Woking with angular has good and enjoyable so far.',
      'Paul'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
    console.log(message);
  }
}
