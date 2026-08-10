
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal
} from '@angular/core';

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
      icon: 'material-symbols--overview-outline.svg'
    },
    {
      name: 'Paying bills',
      icon: 'hugeicons--payment-02.svg'
    },
    {
      name: 'Cards',
      icon: 'wpf--bank-cards.svg'
    },
    {
      name: 'Customers',
      icon: 'streamline--information-desk-customer-remix.svg'
    },
    {
      name: 'Loans',
      icon: 'griddy-icons--loan.svg'
    },
    {
      name: 'Notifications',
      icon: 'material-symbols--notifications-outline-rounded.svg'
    },
    {
      name: 'Reports',
      icon: 'oui--nav-reports.svg'
    },
    {
      name: 'Transactions',
      icon: 'hugeicons--transaction.svg'
    }
  ];
}
