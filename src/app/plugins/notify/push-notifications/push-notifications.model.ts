export class NotifyPN {
  message: any;
  notificationId: string;
  href: string;
  fadedOut: boolean;

  constructor(init?: Partial<NotifyPN>) {
    Object.assign(this, init);
  }
}
