import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { APP_CODES } from '../../config/codes';
import {NotifyService} from '../../plugins/notify/notify.service';
import {NotifyPopUpButtonsActionType, NotifyPopUpButtonsType, NotifyPopUpType} from '../../plugins/notify/popups/popups.model';
import {APP_DEFAULTS} from '../../config/defaults';
import {APP_MESSAGES} from '../../config/messages';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  errors = {
    name: null,
    email: null
  };
  codes;

  constructor(private authService: AuthService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.codes = APP_CODES.CODES;
  }

  onRequestSubmit() {
    this.errors.name = null; this.errors.email = null;
    if (!this.email || !this.name) {
      if (!this.email) { this.errors.email = APP_MESSAGES.MISSING_EMAIL.message; }
      if (!this.name) { this.errors.name = APP_MESSAGES.MISSING_NAME.message; }
    } else {
      const request = {
        name: this.name,
        email: this.email
      };
      this.sendRequest(request);
    }
  }

  sendRequest(request) {
    this.authService.sendRegistrationRequest(request).subscribe(data => {
      this.notifyService.popUp(
        NotifyPopUpType.Info,
        'Success!',
        'Your registration request has been successfully sent and is waiting to be accepted by application moderators or admins.'
      );
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
        switch (response.identifier) {
          case this.codes.MISSING_EMAIL.identifier:
            this.errors.email = APP_MESSAGES.MISSING_EMAIL.message;
            break;
          case this.codes.MISSING_NAME.identifier:
            this.errors.name = APP_MESSAGES.MISSING_NAME.message;
            break;
          case this.codes.EMAIL_REQUEST_ALREADY_MADE.identifier:
            this.notifyService.popUp(
              NotifyPopUpType.Warning,
              APP_MESSAGES.EMAIL_REQUEST_ALREADY_MADE.heading,
              APP_MESSAGES.EMAIL_REQUEST_ALREADY_MADE.message
            );
            break;
          case 'ValidationError':
            this.notifyService.popUp(
              NotifyPopUpType.Warning,
              'Validation Error',
              response.message);
            break;
        }

      }
    });
  }
}
