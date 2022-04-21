
export interface ParqueaderoResponse {
    type:        string;
    query:       string[];
    parqueadero:    Parqueadero[];
    attribution: string;
}

export interface Parqueadero {
    id: number;
    cupos : string;
    direccion :string;
    lat : number;
    long: number;
    tarifa : string;
    vehiculos : string;
    imagenUrl: string;
    activo: boolean;
    uid: string;
    text: string;
    parque_name: string;
    center:        number[];
}

