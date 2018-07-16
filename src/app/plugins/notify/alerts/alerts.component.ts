import { Component, OnInit, Input } from '@angular/core';
import { NotifyAlert, NotifyAlertType } from './alerts.model';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'ns-notify-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input() id: string;

  alerts: NotifyAlert[] = [];

  constructor(private notifyService: NotifyService) { }

  ngOnInit() {
    this.notifyService.getAlert(this.id).subscribe((alert: NotifyAlert) => {
      if (!alert.payload) {
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);

      if (alert.ttl !== 0){
        setTimeout(() => {
          this.removeAlert(alert);
        }, alert.ttl);
      }

    });
  }

  a(){
    this.notifyService.alertSuccess('sucka<strong>hoe</strong>nigga', 0, 'navbar');
  }

  removeAlert(alert: NotifyAlert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  alertClass(alert: NotifyAlert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case NotifyAlertType.Success:
        return 'alert-success';
      case NotifyAlertType.Error:
        return 'alert-danger';
      case NotifyAlertType.Info:
        return 'alert-info';
      case NotifyAlertType.Warning:
        return 'alert-warning';
    }
  }

}
