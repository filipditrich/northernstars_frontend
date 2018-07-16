import { Component, OnInit, HostListener } from '@angular/core';
import { NotifyService } from '../../plugins/notify/notify.service';
import { NotifyPopUpType } from '../../plugins/notify/popups/popups.model';

@Component({
  selector: 'ns-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class NavbarComponent implements OnInit {

  innerWidth: any;
  mobileSize = 568;

  dropdowns = {
    notifications: {
      isOpen: false
    },
    profile: {
      isOpen: false
    }
  };
  menu = {
    isOpen: false
  };

  constructor(private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  onResize(event){
    this.innerWidth = event.target.innerWidth;
  }

  a(){
    this.notifyService.notification('This is a <strong>Notification</strong>', 'xd');
  }

  b(){
    this.notifyService.popUp(NotifyPopUpType.Info, 'A Pop Up', 'This is a popup');
  }

  toggleDropdowns(type) {
    for (const dropdown in this.dropdowns) {
      if (dropdown !== type){
        this.dropdowns[dropdown].isOpen = false;
      }
    }
    this.dropdowns[type].isOpen = !this.dropdowns[type].isOpen;
  }

  toggleMenu(){
    this.menu.isOpen = !this.menu.isOpen;
  }

}
