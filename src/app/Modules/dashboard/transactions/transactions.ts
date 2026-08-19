import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {

  ngOnInit(): void {
    this.bodyTabel();
  }

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

  bodyTabel() {
    return [
      { key: 'العميل', value: 'customer' },
      { key: 'النوع', value: 'type' },
      { key: 'المبلغ', value: 'amount' },
      { key: 'الحالة', value: 'status' },
      { key: 'الوقت', value: 'time' },
    ];
  }


  selectedFilterIndex: number = 0; // الزر الافتراضي (All)

  setFilter(index: number) {
    this.selectedFilterIndex = index;
    // هنا يمكنك إضافة كود تصفية الجدول حسب الفلتر المختار
  }
}
