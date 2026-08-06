import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Success } from './success/success';
import { NoData } from './no-data/no-data';
import { Error } from './error/error';
import { Loader } from './loader/loader';

@NgModule({
  declarations: [Success , NoData , Error , Loader ],
  imports: [CommonModule , AsyncPipe ],
  exports: [Success , NoData , Error , Loader ]
})
export class SharedModule {}
