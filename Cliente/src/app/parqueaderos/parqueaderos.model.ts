//exportacion de la interface de parqueaderos 
export interface Parqueadero {
    id: number;
    cupos : number;
    direccion :string;
    LtnLng: string;
    tarifa : string;
    vehiculos : string;
    imagenUrl: string;
    activo: boolean;
    uid: string;
}