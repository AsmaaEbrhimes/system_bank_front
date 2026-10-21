import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

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
    const rows = 5;
    this.totalRecords =
      this.tableData.length === rows
        ? (this.currentPage + 1) * rows
        : (this.currentPage - 1) * rows + this.tableData.length;
  }

  // ====================== Pagnations ====================== //
  totalRecords = 0;
  currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: any) {
    this.currentPage = Math.floor(event.first / event.rows) + 1;
    this.pageChange.emit(this.currentPage);
  }
}
