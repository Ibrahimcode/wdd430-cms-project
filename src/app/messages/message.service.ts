import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import Message from './message.model';
import {
  MessageGetResponse,
  MessagePostResponse,
} from './message.response.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId!: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  // getMessages() {
  //   return this.messages.slice();
  // }

  getMessage(id: string) {
    let messageFound = null;
    this.messages.forEach((message) => {
      if (message.id === id) {
        messageFound = message;
      }
    });
    return messageFound;
  }

  addMessage(message: Message) {
    // this.messages.push(message);
    // this.messageChangedEvent.next(this.messages.slice());
    // console.log('added ' + this.messages);
    // this.storeMessages();

    if (!message) {
      return;
    }
    // make sure id of the new Document is empty
    message.id = ''; // The sequence generator will generate an id.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http
      .post<MessagePostResponse>('http://localhost:3000/messages', message, {
        headers: headers,
      })
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.message);
        this.messages.sort();
        const messageListClone = this.messages.slice();
        this.messageChangedEvent.next(messageListClone);
      });
  }

  getMaxId() {
    let maxId = 0;

    this.messages.forEach((message) => {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getMessages(): Message[] {
    let messageList!: Message[];
    this.http
      .get<MessageGetResponse>('http://localhost:3000/messages/')
      .subscribe(
        (messages) => {
          // console.log(document);
          this.messages = messages.messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();

          const documentListClone = this.messages.slice();

          this.messageChangedEvent.next(documentListClone);

          messageList = this.messages.slice();
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );

    return messageList;
  }
}
