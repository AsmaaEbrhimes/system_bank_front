import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  status_toggel = signal(true);

  isMobileOrTablet = signal(false);

  @Output() CloseOPen = new EventEmitter<boolean>();

  @Input()
  set StatusMenue(value: boolean) {
    this.status_toggel.set(value);
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobileOrTablet.set(window.innerWidth <= 1200);
  }

  onCloselMenue(): void {
    this.CloseOPen.emit(!this.status_toggel());
  }

  List_Menue = [
    {
      name: 'Overview',
      icon: 'material-symbols--overview-outline.svg',
      Route: '/ContentDashboard',
    },
    {
      name: 'Paying bills',
      icon: 'hugeicons--payment-02.svg',
      Route: '/ContentDashboard/paying_bills',
    },
    {
      name: 'Cards',
      icon: 'wpf--bank-cards.svg',
      Route: '/ContentDashboard/cards',
    },
    {
      name: 'Customers',
      icon: 'streamline--information-desk-customer-remix.svg',
      Route: '/ContentDashboard/custmers',
    },
    {
      name: 'Loans',
      icon: 'griddy-icons--loan.svg',
      Route: '/ContentDashboard/loans',
    },
    {
      name: 'Notifications',
      icon: 'material-symbols--notifications-outline-rounded.svg',
      Route: 'notifications',
    },
    {
      name: 'Reports',
      icon: 'oui--nav-reports.svg',
      Route: '',
    },
    {
      name: 'Transactions',
      icon: 'hugeicons--transaction.svg',
      Route: '',
    },
  ];
}
