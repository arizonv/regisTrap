import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginResetPageRoutingModule } from './login-reset-routing.module';

import { LoginResetPage } from './login-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginResetPageRoutingModule
  ],
  declarations: [LoginResetPage]
})
export class LoginResetPageModule {}
