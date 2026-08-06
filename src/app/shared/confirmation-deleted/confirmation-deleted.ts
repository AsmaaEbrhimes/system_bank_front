import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-delted',
  standalone: false,
  templateUrl: './confirmation-deleted.html',
  styleUrl: './confirmation-delted.scss',
})
export class ConfirmationDelted {
constructor(public ref: DynamicDialogRef) {}
}
