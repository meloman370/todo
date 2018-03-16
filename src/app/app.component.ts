import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogin = false;
  email: string;
  password: string;
  authChange: Subscription;
  showSpinner = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.authChange = this.auth.changeState().subscribe(isLogin => {
      this.isLogin = isLogin;
    });

    this.auth.authState().subscribe(value => {
      if (value) {
        this.auth.user = value;
        this.isLogin = true;
      }
      this.showSpinner = false;
    });
  }

  signUp() {
    this.auth.signUp(this.email, this.password);
  }

  signIn() {
    this.auth.signIn(this.email, this.password);
  }

  ngOnDestroy() {
    this.authChange.unsubscribe();
  }
}
