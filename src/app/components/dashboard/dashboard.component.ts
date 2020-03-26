import { Component, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { MqttAngularService } from 'src/app/services/mqtt-angular.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public maquina1 = {
    canvasWidth: 300,
    needleValue: 0,
    centralLabel: '',
    name: 'Máquina 1',
    bottomLabel: '0 km/h',
    options: {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(61,204,91)','rgb(239,214,19)','rgb(255,84,84)'], 
      arcDelimiters: [40,60],
      rangeLabel: ['0', '100'],
      needleStartValue: 50
    },
    topic: 'estrada/maq_1/100',
    subscription: null,
    idInterval: '',
    enable: false,
    active: false
  };
  public maquina2 = {
    canvasWidth: 300,
    needleValue: 0,
    centralLabel: '',
    name: 'Máquina 2',
    bottomLabel: '0 km/h',
    options: {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(61,204,91)','rgb(239,214,19)','rgb(255,84,84)'], 
      arcDelimiters: [40,60],
      rangeLabel: ['0', '100'],
      needleStartValue: 50
    },
    topic: 'estrada/maq_2/100',
    subscription: null,
    idInterval: '',
    enable: false,
    active: false
  };

  constructor( private _mqttService: MqttAngularService ) {
    
  }

  ngOnInit() {
    this.iniciarSuscripciones()
  }

  ngOnDestroy(): void {
    if( this.maquina1.subscription ) this.maquina1.subscription.unsubscribe();
    if( this.maquina2.subscription ) this.maquina2.subscription.unsubscribe();
  }

  private iniciarSuscripciones(): void {
    this.suscribirseAmaquina( this.maquina1 );
    this.suscribirseAmaquina( this.maquina2 );
  }
  private suscribirseAmaquina( maquina: any ): void {
    maquina.subscription = this._mqttService.suscribirseAtopic( maquina.topic ).subscribe( (mensaje: IMqttMessage) => {
      const DATO = mensaje.payload.toString();
      console.log( '[', maquina.name, ']:', mensaje.payload.toString() );
      maquina.needleValue = DATO;
      maquina.bottomLabel = DATO + ' km/h';
      if( mensaje.payload.toString() == 'off') {
        maquina.needleValue = 0;
        maquina.bottomLabel = '0 km/h';
      }
    });
  }

}
