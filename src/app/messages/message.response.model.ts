import Message from './message.model';
export class MessageGetResponse {
  constructor(public messagAlert: string, public messages: Message[]) {}
}

export class MessagePostResponse {
  constructor(public messageAlert: string, public message: Message) {}
}
