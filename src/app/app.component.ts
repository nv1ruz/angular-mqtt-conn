import { Component } from '@angular/core';
// import { IMqttMessage, MqttService } from 'ngx-mqtt';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-mqtt';
  // public subsTopic: Subscription;
  // public topicName: any;
  // public message: any;

  constructor( ) {}

  // public suscribirseAtopic(): void {
  //   console.warn('Suscripto a topic: ', this.topicName);
  //   this.subsTopic = this._mqttService.observe( this.topicName ).subscribe( (message:IMqttMessage) => {
  //     console.log('Mensaje obtenido: ', message);
  //     console.log('Payload obtenido: ', message.payload.toString());
  //   } );
  // }

  // public cancelarSuscripcion(): void {
  //   if( this.subsTopic ) {
  //     this.subsTopic.unsubscribe();
  //     this.subsTopic = null;
  //     console.error('Suscripción cancelada');
  //   }
  // }

  // public enviarMensaje(): void {
  //   this._mqttService.unsafePublish( this.topicName, this.message, { qos: 1, retain:true });
  //   console.warn('Mensaje enviado: ', this.message);
  // }

}
