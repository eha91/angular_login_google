import { Injectable } from '@angular/core';
import { Response,Http,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ConexionService {
  
  valid = false;
  body = '';

  headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  constructor(public _http:Http,private socket: Socket) { }

  sendToken(token) {
    let json = {
      idtoken:token
    }
    let env = JSON.stringify(json);
    return this._http.post('http://localhost:3000/google',json,{headers:this.headers})
          .map(resp => {
            return resp.json();
          });
  }

  sendLogin(token){
    this.socket.emit("login", {
      token
    });
  }

  getLogin() {
      return this.socket.fromEvent("login-resp");
  }

  sendBegin(company,name){
    this.socket.emit("begin-chat", {
      company,
      name
    });
  }

  getMsj() {
      return this.socket.fromEvent("msj-resp");
  }

  sendMsj(msj) {
    this.socket.emit('send-msj-user',{msj})
  }


}
