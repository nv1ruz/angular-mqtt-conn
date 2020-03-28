import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { GaugeChartModule } from 'angular-gauge-chart'
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '190.7.57.163',
  port: 8093,
  path: '/mqtt'
}

import { AppRoutingModule } from './app.routes';

import { MqttAngularService } from './services/mqtt-angular.service';
import { ApiEstradaService } from './services/api-estrada.service';


import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MaquinasComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GaugeChartModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    MqttAngularService,
    ApiEstradaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
