import {Component} from '@angular/core';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
constructor(public Core:Core){ }
}
