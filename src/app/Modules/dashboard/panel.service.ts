import { Notifications } from './../../shared/notifications/notifications';
import { inject, Injectable } from '@angular/core';
import { Data } from '../../core/Servies/data';
import { map, Observable, shareReplay, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class panel {
  private dataService = inject(Data);
  public refreshNotification$ = new Subject<void>();

  triggerRefresh() {
    this.refreshNotification$.next();
  }

  public readonly Customers$ = this.dataService.get('Customers').pipe(
    map((res: any) => res),
    shareReplay(1),
  );

  public readonly Accounts$ = this.dataService.get('Customers/Accounts').pipe(
    map((res: any) => res),
    shareReplay(1),
  );
}
