export interface Reserva{
    id: number;
    placa: string;
    uid: string;
    pid: number;
    dia_ingreso: string;
    hora_ingreso: string;
    hora_salida: string;
    confirmUser: boolean;
    confirmParqueadero: boolean;
    estado: boolean;
}