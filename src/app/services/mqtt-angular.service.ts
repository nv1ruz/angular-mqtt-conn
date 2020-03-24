import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttAngularService {

  constructor( private _mqttService: MqttService ) { }

  public suscribirseAtopic( topic: any ): Observable<IMqttMessage> {
    console.warn('Suscripto a topic: ', topic);
    return this._mqttService.observe( topic );
  }

  public cancelarSuscripcionAtopic( subs: Subscription ): void {
    if( subs ) {
      subs.unsubscribe();
      console.error('Suscripción cancelada');
    }
  }

  public enviarMensajeAtopic( topic: any, mensaje: any ): void {
    this._mqttService.unsafePublish( topic, mensaje, { qos: 1, retain: true });
    console.warn('[PUBLISH]',topic, ':', mensaje);
  }

}
