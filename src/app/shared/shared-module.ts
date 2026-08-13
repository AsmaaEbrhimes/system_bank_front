import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Success } from './success/success';
import { NoData } from './no-data/no-data';
import { Error } from './error/error';
import { Loader } from './loader/loader';
import { TableModule } from 'primeng/table';
import { Tabel } from './tabel/tabel';
import { SearchComponent } from './search/search.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [Success , NoData , Error , Loader , Tabel , SearchComponent],
  imports: [CommonModule , AsyncPipe , TableModule , AngularSvgIconModule],
  exports: [Success , NoData , Error , Loader , Tabel , SearchComponent],
  providers: [
    DatePipe
  ]
})
export class SharedModule {}
