import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// PLUGINS
import { NotifyComponent } from './plugins/notify/notify.component';
import { NotifyService } from './plugins/notify/notify.service';
import { AlertsComponent } from './plugins/notify/alerts/alerts.component';
import { PopupsComponent } from './plugins/notify/popups/popups.component';
import { PushNotificationsComponent } from './plugins/notify/push-notifications/push-notifications.component';
import { AuthService } from './services/auth/auth.service';
import { ApploadService } from './services/appload/appload.service';
import {AppLoadModule} from './app-load.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotifyComponent,
    AlertsComponent,
    PopupsComponent,
    PushNotificationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppLoadModule
  ],
  providers: [
    NotifyService,
    AuthService,
    ApploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
