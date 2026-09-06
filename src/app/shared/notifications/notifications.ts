import { Component, inject } from '@angular/core';
import { SignalRService } from '../../shared/signal-r';
@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
  public signalRService = inject(SignalRService);

  closeNotification(): void {
    this.signalRService.latestNotification.set(null);
  }
}
