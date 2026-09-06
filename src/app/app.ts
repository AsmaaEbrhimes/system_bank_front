import { Component, signal } from '@angular/core';
import { SignalRService } from './shared/signal-r';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SystemBank');
  constructor(private signalRService: SignalRService) {}
}
