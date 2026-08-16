import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-loans',
  standalone: false,
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class Loans {
  active_tap=signal<number>(0)
  reportData = [
    {
      initials: 'د.ف',
      customer: 'دينا فؤاد',
      type: 'قرض شخصي',
      requestedAmount: '45,000',
      interestRate: '14.5%',
      monthlyInstallment: '24 × 2,145',
      status: 'قيد المراجعة'
    },
    {
      initials: 'ع.ص',
      customer: 'عمرو صلاح',
      type: 'قرض سيارة',
      requestedAmount: '120,000',
      interestRate: '11.2%',
      monthlyInstallment: '48 × 3,105',
      status: 'قيد المراجعة'
    },
    {
      initials: 'م.إ',
      customer: 'منى إبراهيم',
      type: 'قرض تعليمي',
      requestedAmount: '18,500',
      interestRate: '9.0%',
      monthlyInstallment: '12 × 1,624',
      status: 'قيد المراجعة'
    }
  ];

  boayTabel() {
    return [
      { key: 'العميل', value: 'customer' },
      { key: 'نوع القرض', value: 'type' },
      { key: 'المبلغ المطلوب', value: 'requestedAmount' },
      { key: 'نسبة الفائدة', value: 'interestRate' },
      { key: 'الأقساط الشهرية', value: 'monthlyInstallment' }
    ];
  }


  SetActive(number:number){
this.active_tap.set(number)
  }
}
