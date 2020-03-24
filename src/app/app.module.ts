import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GaugeChartModule } from 'angular-gauge-chart'
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '190.7.57.163',
  port: 8093,
  path: '/mqtt'
}

import { MqttAngularService } from './services/mqtt-angular.service';


import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GaugeChartModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    MqttAngularService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
