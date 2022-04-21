//importaciones de angular HTTP
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//importacion de parqueaderos ts 
import { Parqueadero } from '../parqueaderos/parqueaderos.model';

@Injectable({
    providedIn: 'root'
})


export class ParqueaderosService{
    //importacion de laravel (Conexion de laravel MYSQL)
    apiUrl = 'http://localhost:8000/api'

    constructor(private http: HttpClient){}
    
    //metodo get para envio de informacion 
    getParqueaderos(): Observable<Parqueadero[]>{
        return this.http.get<Parqueadero[]>(`${this.apiUrl}/parqueaderos`);
    }
    //añadir parqueaderos 
    addParqueadero(parqueadero: Parqueadero): Observable<Parqueadero> {
        return this.http.post<Parqueadero>(`${this.apiUrl}/parqueaderos`, parqueadero);
    }
    //sistema de actualizacion   de parqueaderos 
    updateParqueadero(parqueaderoId: number, parqueadero: Parqueadero): Observable<Parqueadero> {
        return this.http.put<Parqueadero>(
            `${this.apiUrl}/parqueaderos/${parqueaderoId}`, 
            parqueadero
        );
    }
}