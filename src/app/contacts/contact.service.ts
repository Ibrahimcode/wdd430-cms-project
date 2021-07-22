import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {
  ContactGetResponse,
  ContactPostResponse,
} from './contact.response.model';
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
  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  getContacts(): Contact[] {
    // return this.contacts.slice();
    let contactList!: Contact[];
    this.http
      .get<ContactGetResponse>('http://localhost:3000/contacts')
      .subscribe(
        (contacts) => {
          console.log(contacts);
          this.contacts = contacts.contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();

          const contactListClone = this.contacts.slice();

          this.contactListChangeEvent.next(contactListClone);

          contactList = contactListClone;
          console.log('contactList received');
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );

    return contactList;
  }

  getContact(id: string): Contact {
    let contactFound!: Contact;
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
    // make sure id of the new Document is empty
    newContact.id = ''; // The sequence generator will generate an id.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http
      .post<ContactPostResponse>('http://localhost:3000/contacts', newContact, {
        headers: headers,
      })
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.contacts.sort();
        const contactListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactListClone);
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.contacts.sort();
        const contactListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactListClone);
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.contacts.sort();
        const contactListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactListClone);
      });
  }
}
