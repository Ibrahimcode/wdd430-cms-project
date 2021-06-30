import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  subscribtion!: Subscription;
  contacts: Contact[] = [];
  constructor(public contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangeEvent.subscribe((contactArray) => {
    //   this.contacts = contactArray;
    // });

    this.subscribtion = this.contactService.contactListChangeEvent.subscribe(
      (contactList) => {
        this.contacts = contactList;
      }
    );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  drag() {
    console.log('draged');
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
