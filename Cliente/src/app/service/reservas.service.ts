import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//importacion de parqueaderos ts 
import { Reserva } from '../reservas/reservas.model';

@Injectable({
    providedIn: 'root'
})

export class ReservasService{
    apiUrl = 'http://localhost:8000/api'

    constructor(private http: HttpClient){}

     //metodo get para obtener datos de reservas
    getReservas(): Observable<Reserva[]>{
        return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
    }

    //añadir reservas 
    addReservas(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.apiUrl}/reservas`, reserva);
    }
}