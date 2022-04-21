//exportacion de la interface de parqueaderos 
export interface Parqueadero {
    id: number;
    cupos : string;
    direccion :string;
    tarifa : string;
    vehiculos : string;
    imagenUrl: string;
    activo: boolean;
    uid: string;
}