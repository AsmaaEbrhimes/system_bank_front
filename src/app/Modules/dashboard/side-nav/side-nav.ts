import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {

  List_Menue=[
    {name:"Overview" , icon:"material-symbols--overview-outline.svg"},
    {name:"Paying bills", icon:"hugeicons--payment-02.svg"},
    {name:"Cards", icon:"wpf--bank-cards.svg"},
    {name:"Customers", icon:"streamline--information-desk-customer-remix.svg"},
    {name:"Loans", icon:"griddy-icons--loan.svg"},
    {name:"Notifications", icon:"material-symbols--notifications-outline-rounded.svg"},
    {name:"Reports", icon:"oui--nav-reports.svg"},
    {name:"Transactions", icon:"hugeicons--transaction.svg"},
  ]
}
