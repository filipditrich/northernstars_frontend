import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApploadService } from './services/appload/appload.service';

export function get_codes(apploadService: ApploadService) {
  return () => apploadService.getCodes();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ApploadService,
    { provide: APP_INITIALIZER, useFactory: get_codes, deps: [ApploadService], multi: true }
  ]
})

export class AppLoadModule { }
