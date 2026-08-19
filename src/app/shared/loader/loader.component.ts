import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Core } from '../../core/Servies/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{
constructor(public Core:Core){ }


 progress = 0;
  message = 'جاري التحميل...';
  private interval: any;
  private messages = ['جاري التحميل...', 'جاري الاتصال...', 'يرجى الانتظار...'];
  private msgIndex = 0;


ngOnInit() {
  this.Core._loading.subscribe(isLoading => {
    if (isLoading) {
      this.progress = 0;
      this.msgIndex = 0;
      this.message = 'جاري التحميل...';

      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.progress = Math.min(this.progress + Math.random() * 3.5, 100);
        this.progress = Math.round(this.progress);

        if (this.progress % 33 === 0 && this.progress > 0) {
          this.msgIndex = (this.msgIndex + 1) % this.messages.length;
          this.message = this.messages[this.msgIndex];
        }

        if (this.progress >= 100) {
          this.message = 'جاري التحميل...';
          clearInterval(this.interval);
        }
      }, 100);

    } else {
      this.progress = 100;
      this.message = 'جاري التحميل...';
      clearInterval(this.interval);
    }
  });
}

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
