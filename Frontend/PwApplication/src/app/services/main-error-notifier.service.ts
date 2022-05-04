import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainErrorNotifierService {
  
  private errorText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  setMainErrorMessage(message: string): void {
    this.errorText.next(message);
    this.isVisible.next(true);
  }

  getErrorText(): Observable<string> {
    return this.errorText.asObservable();
  }

  getVisibleState(): Observable<boolean> {
    return this.isVisible.asObservable();
  }

  hide(): void {
    this.isVisible.next(false);
  }
}