import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
declare const gapi: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewInit {

  mensaje = '';
  user;
  constructor(public _cx:ConexionService) { }


  ngOnInit() {

    this._cx.getLogin().subscribe((resp) => {
      console.log(resp);
      this._cx.valid = resp.status;
      this.user = resp.user;
      if(this._cx.valid) {
        this._cx.sendBegin('Farmacias Sol',resp.user.nombre);
      }
    })

    this._cx.getMsj().subscribe((resp) => {
      console.log('Obteniendo Mensaje');
      console.log(resp);
      this._cx.body += resp.msj;
    })

    
  }

  addMsj(msj) {
    if(msj.length > 0) {
      this._cx.sendMsj(msj);
      let fecha = this.getFecha();
      this._cx.body += `
      <div class="chat-message clearfix">
        <img src="${this.user.img}" alt="" width="32" height="32">
        <div class="chat-message-content clearfix">
        <span class="chat-time">${fecha}</span>
        <h5>${this.user.nombre}</h5>
        <p>${msj}</p>
        </div>
      </div> 
       <hr>
      `;
      this.mensaje = '';
    }
  }

  getFecha() {
    let date = new Date();
    let day = this.zero(date.getDay());
    let mes = this.zero(date.getMonth());
    let ano = this.zero(date.getFullYear());
    let hora = this.zero(date.getHours());
    let min = this.zero(date.getMinutes());

    return hora+':'+min+' '+day+'/'+mes+'/'+ano;
  }

  zero(num) {
      let valor = '';
      if(num<10) valor = '0'+num;
    else valor = ''+num;
      return valor;
  }

  

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '904784206385-doq275ubs5r5safcpvsnni38vej1bhls.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},(googleUser) => {

        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log('Token || ' + token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this._cx.sendLogin(token);
        


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public salir() {
    this._cx.valid = false;
    this._cx.body = '';
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      
    });

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.googleInit();
    },5000)
  }

  

}
