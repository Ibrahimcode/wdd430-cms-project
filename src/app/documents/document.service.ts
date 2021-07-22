import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Document from './document.model';
import { DocumentGetResponse } from './document.response.modle';
import { DocumentPostResponse } from './document.response.modle';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId!: number;
  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    //return this.documents.slice();
    let documentList: Document[] = [];
    // let responseObject = {message: String, document: Document[]}
    this.http
      .get<DocumentGetResponse>('http://localhost:3000/documents/')
      .subscribe(
        // success method
        (documents) => {
          console.log(JSON.parse(JSON.stringify(documents)));
          this.documents = JSON.parse(JSON.stringify(documents)).documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();

          const documentListClone = this.documents.slice();

          this.documentListChangedEvent.next(documentListClone);

          documentList = this.documents.slice();
          console.log(this.documents);
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
    return documentList;

    //return this.documents.slice();
  }

  getDocument(id: string) {
    let documentFound!: Document; // = { id: '', name: '', description: '', url: '' };
    this.documents.forEach((document) => {
      console.log(document);
      if (document.id === id) {
        documentFound = document;
      }
    });
    return documentFound;
  }

  getMaxId() {
    let maxId = 0;

    this.documents.forEach((document) => {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    // make sure id of the new Document is empty
    document.id = ''; // The sequence generator will generate an id.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http
      .post<DocumentPostResponse>('http://localhost:3000/documents', document, {
        headers: headers,
      })
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documents.sort();
        const documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.documents.sort();
        const documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.documents.sort();
        const documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
      });
  }
}
