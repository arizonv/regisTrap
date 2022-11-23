import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {
  [x: string]: any;


  
  mdl_correo: string = "";
  mdl_contrasenaNueva: string = "";
  mdl_contrasenaActual: string = "";

  

  constructor(private db: DbService,
    private api: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController) { 
    
  }
  

  ngOnInit() {
  }


 modificarContrasena() {
  let that= this;
  this.loadingController.create({
    message: 'Momento...',
    spinner: 'lines'
  }).then(async data => {
    data.present();
    try {
      let respuesta = await this.api.Cambio(
        this.mdl_correo,
        this.mdl_contrasenaNueva,
        this.mdl_contrasenaActual
       )
      if(respuesta['result'][0].RESPUESTA == 'OK'  ) {
        that.presentToast('Cambio de contraseña OK!');
        that.limpiar();
        this.router.navigate(['login']);
                
      } else {
        that.presentToast('No se pudo almacenar la persona');
      }
    } catch (error) {
      //TODO INDICAR QUE OCURRIÓ UN ERROR CON LA API
    }
    data.dismiss();
  });
}

async presentToast(mensaje) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 1500,
    position: 'bottom'
  });

  await toast.present();
}

limpiar() {
  
  this.mdl_email = "";
  this.mdl_newPassword  = "";
  this.mdl_password  = "";

}

  

}
