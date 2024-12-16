import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './modules/employee/employee.module';
import { ClarityModule } from '@clr/angular';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  usersIcon,
  userIcon,
  gridViewIcon,
  vmwAppIcon,
  bookmarkIcon,
} from '@cds/core/icon';

ClarityIcons.addIcons(
  usersIcon,
  userIcon,
  gridViewIcon,
  vmwAppIcon,
  bookmarkIcon
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    EmployeeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
