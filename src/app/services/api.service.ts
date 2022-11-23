import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string = "https://fer-sepulveda.cl/API_PRUEBA2/api-service.php"

  constructor(private http: HttpClient,
            private db: DbService) { }


  async Login(correo: string, contrasena: string) {
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.post(that.ruta, {
        nombreFuncion: 'UsuarioLogin',
        parametros: [correo, contrasena]
      }).toPromise())
    })
  }

  async Registrar(correo: string, contrasena: string, nombre: string, apellido: string) {
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.post(that.ruta, {
        nombreFuncion: "UsuarioAlmacenar",
        parametros: [correo, contrasena, nombre, apellido]
      }).toPromise())
    })
 }

 async recuperarUsuario(email: string) {
  let that = this;
  return new Promise(resolve => {
    resolve(that.http.get(that.ruta + "?nombreFuncion=UsuarioObtenerNombre&correo=" + email).toPromise())
  });

  }

  
  async Cambio (correo: string, contrasenaNueva: string, contrasenaActual: string) {
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.patch(that.ruta, {
        nombreFuncion: 'UsuarioModificarContrasena',
        parametros: [correo, contrasenaNueva, contrasenaActual]
      }).toPromise())
    })
 }


 async asistencia(CORREO: any, ID_CLASE: any) {
  let that = this;
  return new Promise(resolve => {
    resolve(that.http.post(that.ruta, {
      nombreFuncion: 'AsistenciaAlmacenar',
      parametros: [CORREO, ID_CLASE]
    }).toPromise())
  })
}







}
