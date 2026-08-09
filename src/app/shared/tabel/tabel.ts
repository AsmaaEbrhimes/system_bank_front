import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-tabel',
  standalone: false,
  templateUrl: './tabel.html',
  styleUrl: './tabel.scss',
})
export class Tabel<T extends object> {

  tableData: T[] = [];

  @Input() bodytabel: any[] = [];

  @ContentChild('status')
  statusTemplate?: TemplateRef<any>;

  @ContentChild('actions')
  actionsTemplate?: TemplateRef<any>;

  @Input()
  set data(value: T[]) {
    this.tableData = value ?? [];
  }

  getTemplate(name: string): TemplateRef<any> | null {

    if (name === 'status') {
      return this.statusTemplate ?? null;
    }

    if (name === 'actions') {
      return this.actionsTemplate ?? null;
    }

    return null;
  }
}
