import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {

  mdl_correo: string = "";
  mdl_nombre: string = "";
  mdl_apellido: string = "";

  mdl_pass1 = "";
  mdl_pass2 = "";


  constructor( private db: DbService,
    private api: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  
  almacenar() {
    let that= this;
    this.loadingController.create({
      message: 'Almacenando persona...',
      spinner: 'lines'
    }).then(async data => {
      data.present();
      try {
        if(this.mdl_pass1===this.mdl_pass2){
          let respuesta = await this.api.Registrar(
            this.mdl_correo,
            this.mdl_pass1,
            this.mdl_nombre,
            this.mdl_apellido,
             );
          if(respuesta['result'][0].RESPUESTA == 'OK' ){
            console.log(this.mdl_pass1,this.mdl_pass2) 
            localStorage.setItem('correo', this.mdl_correo );
            localStorage.setItem('contrasena', this.mdl_pass1 );
            localStorage.setItem('nombre', this.mdl_nombre );
            localStorage.setItem('apellido', this.mdl_apellido );
  
            that.presentToast('Persona almacenada correctamente ');
            that.limpiar();
            this.router.navigate(['login']);
          }else { that.presentToast('No se pudo almacenar la persona');}
        }else { that.presentToast('Las contraseñas no coinciden');}
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
    this.mdl_nombre  = "";
    this.mdl_apellido = "";
    this.mdl_pass1 = "";
    this.mdl_pass2 = "";

  }


 

}
