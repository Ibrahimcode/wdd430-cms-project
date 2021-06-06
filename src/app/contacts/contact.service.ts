import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangeEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    let contactFound = {
      id: '',
      name: '',
      email: '',
      phone: '',
      imageUrl: '',
      group: '',
    };
    this.contacts.forEach((contact) => {
      if (contact.id === id) {
        contactFound = contact;
      }
    });
    return contactFound;
  }
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangeEvent.emit(this.contacts.slice());
  }
}
