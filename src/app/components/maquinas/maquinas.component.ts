import { Component, OnInit } from '@angular/core';
import { MqttAngularService } from 'src/app/services/mqtt-angular.service';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {



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



  constructor(  private _mqttService: MqttAngularService ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if( this.maquina1.subscription ) this.maquina1.subscription.unsubscribe();
    if( this.maquina2.subscription ) this.maquina2.subscription.unsubscribe();
  }

  public iniciarMaquina( maquina: any ): void {
    maquina.active = true;
    console.warn( (maquina.name).toUpperCase(), 'INICIADA' );
    this.generarVelociad( maquina );
  }

  public detenerMaquina( maquina: any ): void {
    maquina.active = false;
    console.warn( (maquina.name).toUpperCase(), 'DETENIDA' );
    clearInterval( maquina.idInterval );
    maquina.needleValue = 0;
    maquina.bottomLabel = '0 km/h';
    this.publicarMensaje( maquina.topic, 'off' );
  }

  private generarVelociad( maquina: any ): void {
    maquina.idInterval = setInterval( () => {
      const NUMERO = this.obtenerNumeroAleatorio();
      this.publicarMensaje( maquina.topic, NUMERO.toString() );
      maquina.needleValue = NUMERO;
      maquina.bottomLabel = NUMERO.toString() + ' km/h';
    }, 3000);
  }
  private obtenerNumeroAleatorio(): number {
    const MIN = 0;
    const MAX = 100;
    return Math.floor( Math.random() * (MAX - MIN)) + MIN;
  }
  private publicarMensaje( topic: any, mensaje: any ): void {
    this._mqttService.enviarMensajeAtopic( topic, mensaje );
  }

  public suscribirseAmaquina( maquina: any ): void {
    maquina.enable = true;    
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
  public desuscribirseAmaquina( maquina: any ): void {
    this._mqttService.cancelarSuscripcionAtopic( maquina.subscription );
    this.maquina1.enable = false;
  }



}
