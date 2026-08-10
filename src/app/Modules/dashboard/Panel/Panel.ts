import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: false,
  templateUrl: './Panel.html',
  styleUrl: './Panel.scss',
})
export class Panel {
  status_toggel = signal<boolean>(false);

  onToggelMenue(): void {
    this.status_toggel.update((value) => !value);
  }

  onCloseMenue(event: boolean): void {
    this.status_toggel.set(event);
  }
}
