import { Component, ViewChild, ElementRef, } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-mqtt';
  // private subscription: Subscription;
  // topicname: any;
  // msg: any;
  // isConnected: boolean = false;
  // @ViewChild('msglog', { static: true }) msglog: ElementRef;

  public subsTopic: Subscription;
  public topicName: any;
  public message: any;

  constructor( private _mqttService: MqttService ) {}

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


  public suscribirseAtopic(): void {
    console.warn('Suscripto a topic: ', this.topicName);
    this.subsTopic = this._mqttService.observe( this.topicName ).subscribe( (message:IMqttMessage) => {
      console.log('Mensaje obtenido: ', message);
      console.log('Payload obtenido: ', message.payload.toString());
    } );
  }

  public cancelarSuscripcion(): void {
    if( this.subsTopic ) {
      this.subsTopic.unsubscribe();
      this.subsTopic = null;
      console.error('Suscripción cancelada');
    }
  }

  public enviarMensaje(): void {
    this._mqttService.unsafePublish( this.topicName, this.message, { qos: 1, retain:true });
    console.warn('Mensaje enviado: ', this.message);
  }

  // subscribeNewTopic(): void {
  //   console.log('inside subscribe new topic')
  //   this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
  //     this.msg = message;
  //     console.log('msg: ', message)
  //     console.log('msg: ', message.payload.toString())
  //     this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
  //   });
  //   this.logMsg('subscribed to topic: ' + this.topicname)
  // }

  // sendmsg(): void {
  //   // use unsafe publish for non-ssl websockets
  //   this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
  //   this.msg = ''
  // }
  
  // logMsg(message): void {
  //   this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  // }

  // clear(): void {
  //   this.msglog.nativeElement.innerHTML = '';
  // }

}
