<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::all();
        return response()->json($reservas);
    }

    public function store(Request $request)
    {
       //Validacion
       $request->validate([
           'placa' => 'required',
           'dia_ingreso' => 'required',
           'hora_ingreso' => 'required',
       ]);

       //Guardar en la BD
       $reserva = Reserva::create([
            'uid' => $request->uid,
            'pid' => $request->pid,
            'placa' => $request->placa,
            'dia_ingreso' => $request->dia_ingreso,
            'hora_ingreso' => $request->hora_ingreso,
            'hora_salida' => $request->hora_salida,
            'monto' => $request->monto,
            'ConfirmUser' => $request->ConfirmUser,
            'ConfirmParqueadero' => $request->ConfirmParqueadero,
            'Estado' => $request->Estado
       ]);

       //Retornar respuesta
       return response()->json($reserva);
    }

    public function update(Request $request, Reserva $reserva)
    {
       //Validacion
       $request->validate([
           'placa' => 'required',
           'dia_ingreso' => 'required',
           'hora_ingreso' => 'required',
       ]);

       //Guardar en la BD
       $reserva->update([
            'uid' => $request->uid,
            'pid' => $request->pid,
            'placa' => $request->placa,
            'dia_ingreso' => $request->dia_ingreso,
            'hora_ingreso' => $request->hora_ingreso,
            'hora_salida' => $request->hora_salida,
            'confirmUser' => $request->confirmUser,
            'confirmParqueadero' => $request->confirmParqueadero,
            'estado' => $request->estado
       ]);

       //Retornar respuesta
       return response()->json($reserva);
    }

    public function destroy(Reserva $reserva){
        $reserva->delete();
        return response()->json($reserva);
    }
}
