import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import Message from './message.model';
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
    this.messages.push(message);
    // this.messageChangedEvent.next(this.messages.slice());
    // console.log('added ' + this.messages);
    this.storeMessages();
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
      .get<Message[]>(
        'https://cmsapp-10283-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages) => {
          // console.log(document);
          this.messages = messages;
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

  storeMessages() {
    let messageList = JSON.stringify(this.messages);
    this.http
      .put(
        'https://cmsapp-10283-default-rtdb.firebaseio.com/messages.json',
        messageList,
        { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
      )
      .subscribe(() => {
        const documentListClone = this.messages.slice();
        this.messageChangedEvent.next(documentListClone);
      });
  }
}
