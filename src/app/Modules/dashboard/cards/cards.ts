import { ChangePin } from './change-pin/change-pin';
import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCards } from './create-cards/create-cards';
@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards implements OnInit {
  //=========================Implemantion===============================//
  ngOnInit(): void {
    this.GetAllCards();
  }

  constructor(
    private Data: Data,
    private dialogService: DialogService,
  ) {}

  //=========================Varibels===============================//
  cards = signal<any>([]);
  ref: DynamicDialogRef | any;
  CreateCards = CreateCards;
  ChangePin = ChangePin;

  //=========================Functions===============================//
  GetAllCards() {
    this.Data.get('Cards').subscribe((res) => {
      this.cards.set(res);
    });
  }

  ShowDilog(component:any) {
    this.ref = this.dialogService.open(component, {
      width: '25rem',
      modal: true,
      showHeader: false,
      baseZIndex: 9999999999,
      contentStyle: {
        'border-radius': '24px',
        'text-align': 'end',
      },
    });

    this.ref.onClose.subscribe(() => {
      this.GetAllCards();
    });
  }


  OpenDilogChangePin(){

  }
}
