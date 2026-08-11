import { Component } from '@angular/core';

@Component({
  selector: 'app-paying-bills',
  standalone: false,
  templateUrl: './paying-bills.html',
  styleUrl: './paying-bills.scss',
})
export class PayingBills {
  bodyTableCols: any[] = [];
  activeTab: 'unpaid' | 'paid' = 'unpaid';
  reportData = [
    {
      initials: 'م.ك',
      customer: 'محمود كامل',
      type: 'تحويل صادر',
      amount: '-1,250.00 ج.م',
      status: 'تم التنفيذ',
      time: '10:30 صباحاً',
    },
    {
      initials: 'أ.ع',
      customer: 'أحمد علي',
      type: 'إيداع وارد',
      amount: '+5,000.00 ج.م',
      status: 'تم التنفيذ',
      time: '11:15 صباحاً',
    },
    {
      initials: 'س.م',
      customer: 'سارة محمد',
      type: 'دفع فاتورة',
      amount: '-450.00 ج.م',
      status: 'قيد المعالجة',
      time: '01:45 مساءً',
    },
    {
      initials: 'ع.ح',
      customer: 'عمر حسن',
      type: 'تحويل وارد',
      amount: '+2,100.00 ج.م',
      status: 'تم التنفيذ',
      time: '03:20 مساءً',
    },
  ];

  ngOnInit(): void {
    this.bodyTableCols = [
      { key: 'العميل', value: 'customer' },
      { key: 'النوع', value: 'type' },
      { key: 'المبلغ', value: 'amount' },
      { key: 'الحالة', value: 'status' },
      { key: 'الوقت', value: 'time' },
    ];
  }
}
