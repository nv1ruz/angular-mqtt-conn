import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEstradaService {

  constructor( private httpClient: HttpClient ) {

  }

  public obtenerMaquinas() {
    const url = "http://localhost:3000/api/maquinas";
    return this.httpClient.get( url );
  }

  public eliminarMaquina( id: number ) {
    const url = "http://localhost:3000/api/maquinas/" + id;
    this.httpClient.delete( url ).subscribe();
    
  }

  public crearMaquina( maquina: object ) {
    const url = "http://localhost:3000/api/maquinas/";
    this.httpClient.post( url, maquina ).subscribe();
  }

}
