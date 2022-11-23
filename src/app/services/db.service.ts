import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;

  constructor(private router: Router) { }

  correoLog = '';
  ContrasenaLog = '';

  correoStore = localStorage.getItem('correo');
  contrasenaStore = localStorage.getItem("contrasena");



  validarCredenciales( correoLog, ContrasenaLog) {
    if(correoLog == this.correoStore && ContrasenaLog == this.contrasenaStore) {
      this.validador = true;
      this.router.navigate(['home']);
      return true;
    } else {
      return false;
    }
  }
}