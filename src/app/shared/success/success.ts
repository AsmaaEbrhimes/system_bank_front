import { Component } from '@angular/core';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'app-success',
  standalone: false,
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {
constructor(public Core:Core){}

OnClose(){
  this.Core._Sussess.next('')
}
}
