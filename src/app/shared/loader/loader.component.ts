import { Component, Input } from '@angular/core';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent{
  constructor(public Core:Core){ }
}
