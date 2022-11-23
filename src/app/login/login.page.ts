import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  mdl_correo: string = "";
  mdl_contrasena: string = "";

  mdl_usuario: any;
  mdl_nombre: string = "";
  mdl_apellido: string = "";

  nombreStore = localStorage.getItem('nombre');

constructor(
  private router: Router, 
  private alertController: AlertController,
  private db: DbService,
  private api: ApiService,
  private loadingController: LoadingController,
  private toastController: ToastController) { }

  ngOnInit() {
  }

  Ingresar() {
    let that= this;
    this.loadingController.create({
      message: 'Ingresando...',
      spinner: 'lines'
    }).then(async data => {
      data.present();
      try {
    
        let respuesta = await this.api.Login(
          this.mdl_correo,
          this.mdl_contrasena )

        if(respuesta ["result"] === "LOGIN OK") 
        {
          let data = await this.api.recuperarUsuario(this.mdl_correo);

            that.mdl_usuario = data['result'];
            that.mdl_nombre = that.mdl_usuario[0].NOMBRE;
            that.mdl_apellido = that.mdl_usuario[0].APELLIDO;

          localStorage.setItem('correo', this.mdl_correo );
          localStorage.setItem('nombreHome', this.mdl_nombre );
          localStorage.setItem('apellidoHome', this.mdl_apellido );

          that.presentToast('Bienvenido, '+this.mdl_correo );
          this.router.navigate(['home'],{replaceUrl: true,});
        
        } else {
          that.presentToast('credenciales invalidas');
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
  this.mdl_correo = "";
  this.mdl_contrasena = "";
 
}


}

