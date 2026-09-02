import { inject, Injectable } from '@angular/core';
import { Data } from '../../core/Servies/data';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class panel {
  private dataService = inject(Data);

  public readonly Customers$ = this.dataService.get('Customers').pipe(
    map((res: any) => res),
    shareReplay(1),
  );
}
