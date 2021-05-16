import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import Document from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '001',
      'CIT 260 - Object Oriented Programming',
      'earn Object Oriented Programming and the Java programming language by designing and creating a simple game.',
      'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html'
    ),
    new Document(
      '002',
      'CIT 336 - Web Backend Development',
      'Learn how to develop modern web applications using the MEAN stack',
      'https://www.byui.edu/computer-information-technology/courses'
    ),
    new Document(
      '003',
      'CIT 425 - Data Warehousing',
      'learn how to define, implement and query a database warehouse by leveraging sample data warehouses',
      'https://www.byui.edu/computer-information-technology/courses'
    ),
    new Document(
      '004',
      'CIT 261 - Mobile Application Developmen',
      'create mobile device applications for modern mobile devices.',
      'https://content.byui.edu/file/8ef4d036-0d64-4ec1-8ca2-2f3155f06dd4/6/CIT%20261%20-%20Syllabus.html'
    ),
    new Document(
      '005',
      'WDD 398 – Internship',
      'In this course students will be employed full-time as a web designer or developer for one semester.',
      'https://content.byui.edu/file/8ef4d036-0d64-4ec1-8ca2-2f3155f06dd4/6/CIT%20261%20-%20Syllabus.html'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
