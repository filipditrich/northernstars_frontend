import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { NotifyAlert, NotifyAlertType } from './alerts/alerts.model';
import {NotifyPopUp, NotifyPopUpButtons, NotifyPopUpButtonsAction, NotifyPopUpButtonsType, NotifyPopUpType, NotifyPopUpButtonsActionType} from './popups/popups.model';
import {NotifyPN} from './push-notifications/push-notifications.model';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private alert_subject = new Subject<any>();
  private popup_subject = new Subject<any>();
  private pn_subject = new Subject<any>();
  private persistent = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.persistent) {
          this.persistent = true;
        } else {
          this.clearAlerts();
        }
      }
    });
  }

  getAlert(alertId?: string): Observable<any> {
    return this.alert_subject.asObservable().pipe(filter((alert: NotifyAlert) => alert && alert.alertId === alertId));
  }
  getPopUp(popUpId?: string): Observable<any> {
    return this.popup_subject.asObservable().pipe(filter((popUp: NotifyPopUp) => popUp && popUp.popUpId === popUpId));
  }
  getNotification(notificationId?: string): Observable<any> {
    return this.pn_subject.asObservable().pipe(filter((notification: NotifyPN) => notification && notification.notificationId === notificationId));
  }

  alertSuccess(payload: any, ttl: number = 0, redirect: string = null) {
    this.sendAlert(new NotifyAlert({type: NotifyAlertType.Success, payload, ttl, redirect }));
  }
  popUp(type: NotifyPopUpType = NotifyPopUpType.Info, heading: string = null, text: string, buttons: NotifyPopUpButtons[] = [{type: NotifyPopUpButtonsType.Ok, text: 'Ok', action: {type: NotifyPopUpButtonsActionType.Close, opt: null}}]) {
    this.sendPopUp(new NotifyPopUp({type, heading, text, buttons}));
  }
  notification(message: string, href: string){
    this.sendNotification(new NotifyPN({message, href}));
  }

  sendAlert(alert: NotifyAlert) {
    this.persistent = true;
    this.alert_subject.next(alert);
  }
  sendPopUp(popUp: NotifyPopUp){
    this.popup_subject.next(popUp);
  }
  sendNotification(notification: NotifyPN){
    this.pn_subject.next(notification);
  }




  clearAlerts(alertId?: string) {
    this.alert_subject.next(new NotifyAlert({ alertId }));
  }

}
