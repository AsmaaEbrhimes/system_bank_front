import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new Subject<string>();

  public notification$ = this.notificationSubject.asObservable();
  public latestNotification = signal<string | null>(null);

  constructor() {
    this.startConnection();
    this.addNotificationListener();
  }

  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7007/notificationHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ تم الاتصال بـ SignalR بنجاح!'))
      .catch((err: any) => console.error('❌ خطأ أثناء الاتصال بـ SignalR:', err));
  }

  private addNotificationListener(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      this.notificationSubject.next(message);
      this.latestNotification.set(message);
    });
  }
}
