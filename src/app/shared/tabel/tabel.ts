import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tabel',
  standalone: false,
  templateUrl: './tabel.html',
  styleUrl: './tabel.scss',
})
export class Tabel<T extends object> {
  tableData: T[] = [];

  @Input() bodytabel: any[] = [];
  @Input() templates: Record<string, TemplateRef<any>> = {};

  @Input()
  set data(value: T[]) {
    this.tableData = value ?? [];
  }
}
