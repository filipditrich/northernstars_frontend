import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../plugins/notify/notify.service';
import { NotifyPopUpType } from '../../plugins/notify/popups/popups.model';
import { NotifyPopUpButtonsType, NotifyPopUpButtonsActionType } from '../../plugins/notify/popups/popups.model';
import { AuthService } from '../../services/auth/auth.service';
import {UserAuthModel} from '../../services/auth/user-auth.model';
import { APP_CODES } from '../../config/codes';
import { APP_DEFAULTS } from '../../config/defaults';
import { Router } from '@angular/router';
import {APP_MESSAGES} from '../../config/messages';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  username: string;
  password: string;
  errors = {
    username: null,
    password: null
  };
  codes;

  constructor(private notifyService: NotifyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.codes = APP_CODES.CODES;
  }

  a() {
    this.notifyService.popUp(NotifyPopUpType.Error, 'Site Down', 'We can\'t log you in, because the backend server is not running.', [
      {type: NotifyPopUpButtonsType.Abort, text: 'Damn it!', action: {type: NotifyPopUpButtonsActionType.Close, opt: null}}
    ]);
  }

  onLoginSubmit() {
    this.loading = true;
    this.errors.password = null; this.errors.username = null;
    if (!this.password || !this.username){
      if (!this.password) {this.errors.password = APP_MESSAGES.MISSING_PASSWORD.message}
      if (!this.username) {this.errors.username = APP_MESSAGES.MISSING_USERNAME.message}
      this.loading = false;
    } else {
      const user = {
        username: this.username,
        password: this.password
      };
      this.loginUser(user);
    }
  }

  loginUser(user: UserAuthModel) {
    this.authService.authenticateUser(user).subscribe(data => {
      this.authService.storeUserData(data.token, data.user);
      this.router.navigate(['/navbar']);
    }, error => {
      const response = error.error.response;
      if (error.status === 0) {
        this.notifyService.popUp(
          NotifyPopUpType.Error,
          APP_DEFAULTS.POP_UPS.SERVER_DOWN.HEADING,
          APP_DEFAULTS.POP_UPS.SERVER_DOWN.MESSAGE,
          APP_DEFAULTS.POP_UPS.SERVER_DOWN.BUTTONS
        );
      } else {
        console.log(response.identifier);
        switch (response.identifier){
          case this.codes.INVALID_PASSWORD.identifier:
            this.errors.password = APP_MESSAGES.INVALID_PASSWORD.message;
            break;
          case this.codes.INVALID_USERNAME.identifier:
            this.errors.username = APP_MESSAGES.INVALID_USERNAME.message;
            break;
          case this.codes.MISSING_CREDENTIALS.identifier:
            if (!this.password) {this.errors.password = APP_MESSAGES.MISSING_PASSWORD.message}
            if (!this.username) {this.errors.username = APP_MESSAGES.MISSING_USERNAME.message}
            break;
          default:
            this.notifyService.popUp(
              NotifyPopUpType.FatalError,
              APP_DEFAULTS.POP_UPS.UNEXPECTED.HEADING,
              APP_DEFAULTS.POP_UPS.UNEXPECTED.MESSAGE,
              APP_DEFAULTS.POP_UPS.UNEXPECTED.BUTTONS
            );
            break;
        }
        this.loading = false;
      }
    });
  }

}
