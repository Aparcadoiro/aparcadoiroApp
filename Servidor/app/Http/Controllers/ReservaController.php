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
            'pagado' => $request->pagado
       ]);

       //Retornar respuesta
       return response()->json($reserva);
    }
}
