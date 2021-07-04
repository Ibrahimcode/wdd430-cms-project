import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Document from './document.model';
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

    this.http
      .get<Document[]>(
        'https://cmsapp-10283-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        // success method
        (documents) => {
          // console.log(document);
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();

          const documentListClone = this.documents.slice();

          this.documentListChangedEvent.next(documentListClone);

          documentList = this.documents.slice();
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
      if (document.id === id) {
        documentFound = document;
      }
    });
    return documentFound;
  }

  // deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  // }

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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // const documentListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // const documentListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // const documentListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  storeDocuments() {
    let documentsList = JSON.stringify(this.documents);
    this.http
      .put(
        'https://cmsapp-10283-default-rtdb.firebaseio.com/documents.json',
        documentsList,
        { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
      )
      .subscribe(() => {
        const documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
      });
  }
}
