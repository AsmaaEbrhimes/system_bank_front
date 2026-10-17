import { Data } from './../../../core/Servies/data';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { panel } from '../panel.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllNotifications();
    this.Panel.refreshNotification$.subscribe(() => {
      this.getAllNotifications();
    });
  }

  constructor(
    private Panel: panel,
    private Data: Data,
  ) {}

  //=========================Varibels===============================//
  notifications = signal<any>([]);

  // =========================Output & Input=============================== //
  @Output() toggelMenue = new EventEmitter<boolean>();

  // =========================Functions=============================== //
  onToggelMenue() {
    this.toggelMenue.emit();
  }
  getAllNotifications() {
    this.Data.get('Notifications/GetAllNotification').subscribe((res) =>
      this.notifications.set(res || []),
    );
  }

  getUnreadCount() {
    return this.notifications()?.filter((n: any) => !n.isRead)?.length || 0;
  }

  markAsRead() {
    if (this.getUnreadCount() === 0) {
      return;
    }

    this.Data.put('Notifications/MarkAsRead', {}).subscribe({
      next: (res: any) => {
        const updatedNotifications = this.notifications().map((item: any) => ({
          ...item,
          isRead: true,
        }));
        this.notifications.set(updatedNotifications);
      },
    });
  }
}
