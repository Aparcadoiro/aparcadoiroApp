//exportacion de la interface de parqueaderos 
export interface Parqueadero {
    id: number;
    cupos : number;
    direccion :string;
    tarifa : string;
    vehiculos : string;
    imagenUrl: string;
    activo: boolean;
    uid: string;
}