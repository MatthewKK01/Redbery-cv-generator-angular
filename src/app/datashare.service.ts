import { Injectable } from '@angular/core';
import { UserProfile } from './models';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  private userSubject: BehaviorSubject<UserProfile>;
  public user$: Observable<UserProfile>;
  private isHomepageSubject = new BehaviorSubject<boolean>(true);

  isHomepage$ = this.isHomepageSubject.asObservable();
  userDataFromLocalStorage = localStorage.getItem('userData');

  constructor() {
    this.userSubject = new BehaviorSubject<UserProfile>(
      this.userDataFromLocalStorage
        ? JSON.parse(this.userDataFromLocalStorage)
        : {
          name: '',
          surname: '',
          email: '',
          phone_number: '',
          experiences: [],
          educations: [],
          image: '',
          about_me: '',
        }
    );

    this.user$ = this.userSubject.asObservable();
  }

  setIsHomepage(value: boolean) {
    this.isHomepageSubject.next(value);
  }

  getUser(): Observable<UserProfile> {
    return this.user$;
  }
  updateUser(updatedUser: UserProfile): void {
    // Update the user data in the BehaviorSubject.
    this.userSubject.next(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  }
  resetUser(): void {
    // Reset the user data to an empty state.
    this.userSubject.next({
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      experiences: [],
      educations: [],
      image: '',
      about_me: '',
    });
  }

}