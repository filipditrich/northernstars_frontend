import { Component, OnInit, Input } from '@angular/core';
import { NotifyPN } from './push-notifications.model';
import { NotifyService } from '../notify.service';
import {animate, keyframes, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ns-notify-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss'],
  animations: [
    trigger('popIn', [
      transition('* <=> *', [
        query(':enter', [
          animate('400ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translate(100%, 0)' }),
            style({ opacity: 1, transform: 'translate(0, 0)' }),
            style({ opacity: 1, transform: 'translate(-10%, 0)' }),
            style({ opacity: 1, transform: 'translate(0, 0)' }),
          ]))
        ], { optional: true }),
        query(':leave', [
          animate('250ms ease-out', keyframes([
            style({ opacity: 1, transform: 'translate(0, 0)' }),
            style({ opacity: 0, transform: 'translate(100%, 0)' }),
          ]))
        ], { optional: true })
      ])
    ])
  ]
})
export class PushNotificationsComponent implements OnInit {

  @Input() id: string;

  notifications: NotifyPN[] = [];

  constructor(private notifyService: NotifyService) { }

  ngOnInit() {
    this.notifyService.getNotification(this.id).subscribe((notification: NotifyPN) => {
      if (!notification.message) {
        this.notifications = [];
        return;
      }
      this.notifications.push(notification);
      this.dismissNotification(notification, 3500);
    });
  }

  removeNotification(notification: NotifyPN) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  dismissNotification(notification: NotifyPN, ttl: number = 5000) {
    setTimeout(() => {
      this.removeNotification(notification);
    }, ttl);
  }


}
