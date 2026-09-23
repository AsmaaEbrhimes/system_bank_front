import { Component, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';

@Component({
  selector: 'app-custmers',
  standalone: false,
  templateUrl: './custmers.html',
  styleUrl: './custmers.scss',
})
export class Custmers {
  //=========================Implemantion===============================//

  ngOnInit(): void {
    this.getData();
  }

  constructor(private Data: Data) {}
  //=========================Varibels===============================//
  data = signal<any>([]);

  //=========================Functions===============================//

  getData() {
    this.Data.get(`Customers`).subscribe((res: any) => {
      this.data.set(res);
      this.bodyTabel();
    });
  }

  bodyTabel() {
    return [
      { key: 'Full Name', value: 'fullName' },
      { key: 'National ID', value: 'nationalId' },
      { key: 'Phone Number', value: 'phoneNumber' },
      { key: 'Created At', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }
}
