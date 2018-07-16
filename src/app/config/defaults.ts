import {NotifyPopUpButtonsActionType, NotifyPopUpButtonsType} from '../plugins/notify/popups/popups.model';

export const APP_DEFAULTS = {

  POP_UPS: {
    SERVER_DOWN: {
      HEADING: 'Servers Unreachable',
      MESSAGE: 'Our servers are currently unreachable, please try again later.',
      BUTTONS: [{ type: NotifyPopUpButtonsType.Abort, text: 'Close', action: { type: NotifyPopUpButtonsActionType.Close, opt: null } }]
    },
    UNEXPECTED: {
      HEADING: 'Unexpected Error Occurred',
      MESSAGE: 'Server has returned an unexpected error, please contact system administrator.',
      BUTTONS: [{ type: NotifyPopUpButtonsType.Abort, text: 'Close', action: { type: NotifyPopUpButtonsActionType.Close, opt: null } }]
    }
  }

};
