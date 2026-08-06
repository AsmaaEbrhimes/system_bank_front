import { Component } from '@angular/core';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {
  constructor(public Core: Core) {}
  close() {
    this.Core._Error.next('');
  }
}
