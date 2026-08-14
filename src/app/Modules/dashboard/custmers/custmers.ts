import { Component } from '@angular/core';

@Component({
  selector: 'app-custmers',
  standalone: false,
  templateUrl: './custmers.html',
  styleUrl: './custmers.scss',
})
export class Custmers {
ngOnInit(): void {
this.bodyTabel()
}

  reportData = [
  {
    initials: "م.ك",
    customer: "محمود كامل",
    nationalId: "29801*********",
    accountsCount: 2,
    totalBalance: "84,220.00",
    status: "نشط"
  },
  {
    initials: "س.ع",
    customer: "سارة عادل",
    nationalId: "29505*********",
    accountsCount: 1,
    totalBalance: "12,940.50",
    status: "نشط"
  },
  {
    initials: "ي.ن",
    customer: "يوسف ناصر",
    nationalId: "30011*********",
    accountsCount: 3,
    totalBalance: "201,005.00",
    status: "نشط"
  },
  {
    initials: "ر.ط",
    customer: "رنا طارق",
    nationalId: "29712*********",
    accountsCount: 1,
    totalBalance: "5,430.00",
    status: "مراجعة KYC"
  }
];



bodyTabel(){
  return [
     { key: "العميل", value: "customer" },
    { key: "الرقم القومي", value: "nationalId" },
    { key: "عدد الحسابات", value: "accountsCount" },
    { key: "الرصيد الكلي", value: "totalBalance" },
    { key: "الحالة", value: "status" }
  ]
}
}
