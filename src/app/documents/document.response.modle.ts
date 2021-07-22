import Document from './document.model';

export class DocumentGetResponse {
  constructor(public message: string, public documents: Document[]) {}
}

export class DocumentPostResponse {
  constructor(public message: string, public document: Document) {}
}
