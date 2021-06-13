import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangeEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangeEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  maxContactId!: number;
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangeEvent.emit(this.contacts.slice());
  // }

  getMaxId() {
    let maxId = 0;

    this.contacts.forEach((contact) => {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const documentListClone = this.contacts.slice();
    this.contactListChangeEvent.next(documentListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const documentListClone = this.contacts.slice();
    this.contactListChangeEvent.next(documentListClone);
  }

  deleteContact(document: Contact) {
    if (!document) {
      return;
    }
    const pos = this.contacts.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const documentListClone = this.contacts.slice();
    this.contactListChangeEvent.next(documentListClone);
  }
}
