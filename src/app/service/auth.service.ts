import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user;
  subject = new Subject;

  constructor(private fireAuth: AngularFireAuth) {}

  authState(): Observable<any> {
      return this.fireAuth.authState;
  }

  signIn(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          this.user = user;
          this.subject.next(true);
          console.log('success', user);
        })
        .catch(err => {
          console.log('error', err);
        });
  }

  signUp(email: string, password: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.user = user;
          this.subject.next(true);
          console.log('success', user);
        })
        .catch(err => {
          console.log('error', err);
        });
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.subject.next(false);
  }

  changeState(): Observable<any> {
    return this.subject.asObservable();
  }

}
