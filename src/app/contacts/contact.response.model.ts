import { Contact } from './contact.model';
export class ContactGetResponse {
  constructor(public message: string, public contacts: Contact[]) {}
}

export class ContactPostResponse {
  constructor(public message: string, public contact: Contact) {}
}
