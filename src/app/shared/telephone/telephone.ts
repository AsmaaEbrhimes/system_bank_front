import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-telephone',
  standalone: false,
  templateUrl: './telephone.html',
  styleUrl: './telephone.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Telephone),
      multi: true,
    },
  ],
})
export class Telephone implements ControlValueAccessor {
  COUNTRIES: any[] = [
    {
      name: 'Egypt',
      code: 'EG',
      dialCode: '+20',
      icon: 'twemoji--flag-egypt',
      placeholder: '100 123 4567',
      maxLength: 10,
    },
    {
      name: 'Algeria',
      code: 'DZ',
      dialCode: '+213',
      icon: 'emojione-v1--flag-for-algeria',
      placeholder: '550 12 34 56',
      maxLength: 9,
    },
    {
      name: 'Bahrain',
      code: 'BH',
      dialCode: '+973',
      icon: 'emojione-v1--flag-for-bahrain',
      placeholder: '3600 1234',
      maxLength: 8,
    },
    {
      name: 'Comoros',
      code: 'KM',
      dialCode: '+269',
      icon: 'emojione-v1--flag-for-comoros',
      placeholder: '321 01 23',
      maxLength: 7,
    },
    {
      name: 'Djibouti',
      code: 'DJ',
      dialCode: '+253',
      icon: 'emojione-v1--flag-for-djibouti',
      placeholder: '77 12 34 56',
      maxLength: 8,
    },
    {
      name: 'Iraq',
      code: 'IQ',
      dialCode: '+964',
      icon: 'emojione-v1--flag-for-iraq',
      placeholder: '790 123 4567',
      maxLength: 10,
    },
    {
      name: 'Jordan',
      code: 'JO',
      dialCode: '+962',
      icon: 'emojione-v1--flag-for-jordan',
      placeholder: '7 9123 4567',
      maxLength: 9,
    },
    {
      name: 'Kuwait',
      code: 'KW',
      dialCode: '+965',
      icon: 'emojione-v1--flag-for-kuwait',
      placeholder: '9001 2345',
      maxLength: 8,
    },
    {
      name: 'Lebanon',
      code: 'LB',
      dialCode: '+961',
      icon: 'emojione-v1--flag-for-lebanon',
      placeholder: '70 123 456',
      maxLength: 8,
    },
    {
      name: 'Libya',
      code: 'LY',
      dialCode: '+218',
      icon: 'emojione-v1--flag-for-libya',
      placeholder: '91 123 4567',
      maxLength: 9,
    },
    {
      name: 'Mauritania',
      code: 'MR',
      dialCode: '+222',
      icon: 'emojione-v1--flag-for-mauritania',
      placeholder: '45 12 34 56',
      maxLength: 8,
    },
    {
      name: 'Morocco',
      code: 'MA',
      dialCode: '+212',
      icon: 'emojione-v1--flag-for-morocco',
      placeholder: '612 34 56 78',
      maxLength: 9,
    },
    {
      name: 'Oman',
      code: 'OM',
      dialCode: '+968',
      icon: 'emojione-v1--flag-for-oman',
      placeholder: '9123 4567',
      maxLength: 8,
    },
    {
      name: 'Palestine',
      code: 'PS',
      dialCode: '+970',
      icon: 'emojione-v1--flag-for-palestinian-territories',
      placeholder: '599 123 456',
      maxLength: 9,
    },
    {
      name: 'Qatar',
      code: 'QA',
      dialCode: '+974',
      icon: 'twemoji--flag-qatar',
      placeholder: '3312 3456',
      maxLength: 8,
    },
    {
      name: 'Saudi Arabia',
      code: 'SA',
      dialCode: '+966',
      icon: 'emojione-v1--flag-for-saudi-arabia',
      placeholder: '50 123 4567',
      maxLength: 9,
    },
    {
      name: 'Somalia',
      code: 'SO',
      dialCode: '+252',
      icon: 'emojione-v1--flag-for-somalia',
      placeholder: '61 234 5678',
      maxLength: 9,
    },
    {
      name: 'Sudan',
      code: 'SD',
      dialCode: '+249',
      icon: 'emojione-v1--flag-for-sudan',
      placeholder: '91 234 5678',
      maxLength: 9,
    },
    {
      name: 'Syria',
      code: 'SY',
      dialCode: '+963',
      icon: 'emojione-v1--flag-for-syria',
      placeholder: '944 123 456',
      maxLength: 9,
    },
    {
      name: 'Tunisia',
      code: 'TN',
      dialCode: '+216',
      icon: 'emojione-v1--flag-for-tunisia',
      placeholder: '20 123 456',
      maxLength: 8,
    },
    {
      name: 'United Arab Emirates',
      code: 'AE',
      dialCode: '+971',
      icon: 'emojione-v1--flag-for-united-arab-emirates',
      placeholder: '50 123 4567',
      maxLength: 9,
    },
    {
      name: 'Yemen',
      code: 'YE',
      dialCode: '+967',
      icon: 'emojione-v1--flag-for-yemen',
      placeholder: '771 234 567',
      maxLength: 9,
    },
    {
      name: 'United States',
      code: 'US',
      dialCode: '+1',
      icon: 'emojione-v1--flag-for-united-states',
      placeholder: '202 555 0123',
      maxLength: 10,
    },
  ];

  isOpen = signal<boolean>(false);
  select_item = signal<any>(this.COUNTRIES[0]);

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: string): void {
    this.value = val || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('0')) {
      value = value.substring(1);
    }
    const max = this.select_item()?.maxLength;
    if (max && value.length > max) {
      value = value.substring(0, max);
    }

    input.value = value;
    this.value = value;
    this.emitValue();
  }

  onChooesCountry(item: any, event: Event, inputElement: HTMLInputElement) {
    event.stopPropagation();
    this.select_item.set(item);
    this.isOpen.set(false);
    if (inputElement) {
      inputElement.value = '';
    }
    this.value = '';
    this.emitValue();
  }

  private emitValue() {
    this.onChange(this.value ? this.select_item().dialCode + this.value : '');
    this.onTouched();
  }
}
