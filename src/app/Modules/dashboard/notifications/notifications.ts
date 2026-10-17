import { Panel } from './../Panel/Panel';
import { Data } from './../../../core/Servies/data';
import { Component, OnInit, signal } from '@angular/core';
import { panel } from '../panel.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllNotifications();
  }

  constructor(private Data:Data) {}

  //=========================Varibels===============================//
  notifications = signal<any>([]);




  // =========================Functions=============================== //
  getAllNotifications() {
      this.Data.get('Notifications/GetAllNotification').subscribe((res)=>this.notifications.set(res || []))

  }
}
