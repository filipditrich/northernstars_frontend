export class NotifyAlert {
  type: NotifyAlertType;
  payload: any;
  alertId: string;
  persistent: boolean;
  ttl: number;
  redirect: string;

  constructor(init?: Partial<NotifyAlert>) {
    Object.assign(this, init);
  }
}

export enum NotifyAlertType {
  Success,
  Error,
  Warning,
  Info
}
