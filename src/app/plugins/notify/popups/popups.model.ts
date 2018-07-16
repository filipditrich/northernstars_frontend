//  PopUp
export class NotifyPopUp {
  type: NotifyPopUpType;
  heading: string;
  text: string;
  popUpId: string;
  buttons: NotifyPopUpButtons[];

  constructor(init?: Partial<NotifyPopUp>) {
    Object.assign(this, init);
  }
}

  export enum NotifyPopUpType {
    Error,
    FatalError,
    Warning,
    Info,
  }

//  Buttons
export class NotifyPopUpButtons {
  type: NotifyPopUpButtonsType;
  text: string;
  action: NotifyPopUpButtonsAction;
}

  export enum NotifyPopUpButtonsType {
    Ok,
    Cancel,
    Abort
  }

//  Button - Actions
export class NotifyPopUpButtonsAction {
  type: NotifyPopUpButtonsActionType;
  opt: string;
}

  export enum NotifyPopUpButtonsActionType {
    Close,
    Redirect
  }
