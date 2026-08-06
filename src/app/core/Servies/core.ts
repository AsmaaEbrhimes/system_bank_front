import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Core {
  _loading = new BehaviorSubject<boolean>(false);
  _Sussess = new BehaviorSubject<string>('');
  _Error = new BehaviorSubject<string>('');
  minDate = signal<Date>(new Date());
  originalDataStore = signal<any[]>([]);
  constructor() {
    this.setupCalendarConstraints();
  }

  // *****************************disabeld old date***********************************
  setupCalendarConstraints(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.minDate.set(today);
  }

  // *****************************Search***********************************//
  search<T>(searchTerm: string, searchKeys: (keyof T)[]): T[] {
    const term = searchTerm?.trim();
    const data = this.originalDataStore();
    if (!term) return data;
    const normalizedSearch = this.normalizeArabic(term);
    return data.filter((item: any) => {
      return searchKeys.some((key) => {
        const valueToSearch = item[key] ? String(item[key]) : '';
        const normalizedValue = this.normalizeArabic(valueToSearch);
        return normalizedValue.includes(normalizedSearch);
      });
    });
  }

  private normalizeArabic(text: string): string {
    return text.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();
  }

  
  // *****************************Prevent minus***********************************//
  onKeyDown(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }
}
