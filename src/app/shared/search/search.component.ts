import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'haqeq-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private Core: Core) {}

  @Input() ArrayColumns: string[] = [];
  @Output() DataFilter = new EventEmitter<any[]>();

  onSearchFinicilaConverner(event: any) {
    const results = this.Core.search(event.target.value, this.ArrayColumns);
    this.DataFilter.emit(results);
  }
}
