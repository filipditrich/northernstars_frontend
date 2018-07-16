import { Component, Input, OnInit} from '@angular/core';
import { NotifyPopUp, NotifyPopUpButtons, NotifyPopUpButtonsType, NotifyPopUpType, NotifyPopUpButtonsAction, NotifyPopUpButtonsActionType } from './popups.model';
import { NotifyService } from '../notify.service';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger, state, animateChild } from '@angular/animations';

@Component({
  selector: 'ns-notify-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss'],
  animations: [
    trigger('popIn', [
      transition('* <=> *', [
        query(':enter', [
          animate('400ms ease-in', keyframes([
            style({ transform: 'scale(0) translate(-50%, -50%)', opacity: 0 }),
            style({ transform: 'scale(1.1) translate(-50%, -50%)', opacity: 1 }),
            style({ transform: 'scale(0.9) translate(-50%, -50%)', opacity: 1 }),
            style({ transform: 'scale(1) translate(-50%, -50%)', opacity: 1 }),
          ]))
        ], { optional: true }),
        query(':leave', [
          animate('250ms ease-out', keyframes([
            style({ transform: 'scale(1) translate(-50%, -50%)', opacity: 1 }),
            style({ transform: 'scale(0) translate(-50%, -50%)', opacity: 0 }),
          ]))
        ], { optional: true })
      ])
    ])
  ]
})
export class PopupsComponent implements OnInit {

  @Input() id: string;

  popUps: NotifyPopUp[] = [];

  constructor(private notifyService: NotifyService,
              private router: Router) { }

  ngOnInit() {
    this.notifyService.getPopUp(this.id).subscribe((popUp: NotifyPopUp) => {
      if (!popUp.text) {
        this.popUps = [];
        return;
      }
      this.popUps.unshift(popUp);
    });
  }

  b() {
    this.notifyService.popUp(NotifyPopUpType.Info, 'Only Close Type Pop Up', 'Hit the button below to close this popup', [
      {type: NotifyPopUpButtonsType.Ok, text: 'Close', action: {type: NotifyPopUpButtonsActionType.Close, opt: null}}
    ]);
  }

  a() {
    this.notifyService.popUp(NotifyPopUpType.Info, 'Multiple Buttons Type Pop Up', 'Hit the buttons below and see what happens', [
      {type: NotifyPopUpButtonsType.Cancel, text: 'Close', action: {type: NotifyPopUpButtonsActionType.Close, opt: null}},
      {type: NotifyPopUpButtonsType.Ok, text: 'Redirect', action: {type: NotifyPopUpButtonsActionType.Redirect, opt: 'navbar'}},
      {type: NotifyPopUpButtonsType.Abort, text: 'Delete', action: {type: NotifyPopUpButtonsActionType.Close, opt: null}}
    ]);
  }

  removePopUp(popUp: NotifyPopUp) {
    this.popUps = this.popUps.filter(x => x !== popUp);
  }

  popUpClass(popUp: NotifyPopUp) {
    if (!popUp) { return; }

    switch (popUp.type) {
      case NotifyPopUpType.Info:
        return 'popup-info';
      case NotifyPopUpType.Error:
        return 'popup-danger';
      case NotifyPopUpType.FatalError:
        return 'popup-fatal';
      case NotifyPopUpType.Warning:
        return 'popup-warn';
    }
  }

  popUpButtonClass(button: NotifyPopUpButtons) {
    if (!button) { return; }

    switch (button.type) {
      case NotifyPopUpButtonsType.Ok:
        return 'btn-ok';
      case NotifyPopUpButtonsType.Cancel:
        return 'btn-cancel';
      case NotifyPopUpButtonsType.Abort:
        return 'btn-danger';
    }
  }

  popUpButtonAction(button: NotifyPopUpButtons, popUp: NotifyPopUp) {
    if (!button) { return; }

    switch (button.action.type) {
      case NotifyPopUpButtonsActionType.Close:
        return this.removePopUp(popUp);
      case NotifyPopUpButtonsActionType.Redirect:
        return this.router.navigate([button.action.opt]) && this.removePopUp(popUp);
    }
  }

}
