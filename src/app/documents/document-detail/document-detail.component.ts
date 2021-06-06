import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow!: any;
  document!: Document;

  constructor(
    private documentService: DocumentService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private windowService: WindRefService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
    this.nativeWindow = this.windowService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
