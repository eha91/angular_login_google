import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConexionService } from './services/conexion.service';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
 
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [
    ConexionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
