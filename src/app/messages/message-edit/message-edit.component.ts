import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '1';
  @Output() addMessageEvent = new EventEmitter();

  @ViewChild('subject', { static: true }) subject!: ElementRef;
  @ViewChild('msgText', { static: true }) msgText!: ElementRef;
  @ViewChild('formDefault', { static: true }) formDefault!: ElementRef;

  constructor(public messageSevice: MessageService) {}

  ngOnInit(): void {}

  onSendMessage() {
    const sub = this.subject.nativeElement.value;
    const text = this.msgText.nativeElement.value;

    // const message = new Message(1234, this.subject, this.msgText, this.currentSender,)
    const message = {
      id: '123', // The sequence generator will generate and change this id.
      subject: sub,
      msgText: text,
      sender: this.currentSender,
    };

    this.addMessageEvent.emit(message);
    this.messageSevice.addMessage(message);
    this.formDefault.nativeElement.preventDefault();
    // console.log(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
