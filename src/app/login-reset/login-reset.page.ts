import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.page.html',
  styleUrls: ['./login-reset.page.scss'],
})
export class LoginResetPage implements OnInit {

  constructor( private router: Router, 
    private alertController: AlertController,
    private db: DbService) { }

  new_mdl_user: string = '';
  new_mdl_password: string = '';

  user = localStorage.getItem("user");
  password = localStorage.getItem("password");

  ngOnInit() {
  }

  ValidarCredenciales(){
    if(this.new_mdl_user == this.user && this.new_mdl_password == this.password){

      this.router.navigate(['home']);
      
    }else {
      this.mostrarMensaje();
    // this.router.navigate(['pagina-dos']);
  }
}


async mostrarMensaje() {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'Usuario o Password Incorrectas',
    buttons: ['Entiendo'],
  });

  await alert.present();
}

}

