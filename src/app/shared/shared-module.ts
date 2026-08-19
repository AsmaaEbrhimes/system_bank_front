import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Success } from './success/success';
import { NoData } from './no-data/no-data';
import { Error } from './error/error';
import { TableModule } from 'primeng/table';
import { Tabel } from './tabel/tabel';
import { SearchComponent } from './search/search.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [Success , NoData , Error  , Tabel , SearchComponent , LoaderComponent],
  imports: [CommonModule , AsyncPipe , TableModule , AngularSvgIconModule],
  exports: [Success , NoData , Error  , Tabel , SearchComponent, LoaderComponent],
  providers: [
    DatePipe
  ]
})
export class SharedModule {}
