import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  texto: string = '';
  arreglo: any = '';

  CORREO = localStorage.getItem("correo").toUpperCase();
  ID_CLASE = localStorage.getItem("codigo");

  asignatura = localStorage.getItem("asignatura");

  constructor( private router: Router, 
    private alertController: AlertController,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async scanQR() {
    let that = this;
    this.texto = '';
    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      setTimeout(function () {
        console.log(result.content);
        that.texto = result.content;
        that.arreglo = that.texto.split('|',2);
        localStorage.setItem('codigo', that.arreglo[0] );
        localStorage.setItem('asignatura', that.arreglo[1] );
        that.registrar();
        document.querySelector('body').classList.remove('scanner-active');
      }, 1000);
    }
  }

  registrar() {
    let that= this;
    this.loadingController.create({
      message: 'Ingresando...',
      spinner: 'lines'
    }).then(async data => {
      data.present();
      try {
        let respuesta = await this.api.asistencia(
          this.CORREO,
          this.ID_CLASE 
          )
        if(respuesta["result"][0].RESPUESTA === "OK"){
          that.presentToast('asistencia registrada');
          this.router.navigate(['home']);
        } else {
          that.presentToast('asistencia registrada');
          this.router.navigate(['home']);
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


  stopScan (){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  

}
