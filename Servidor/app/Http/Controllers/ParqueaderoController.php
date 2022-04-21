<?php

namespace App\Http\Controllers;

use App\Models\Parqueadero;
use Illuminate\Http\Request;

class ParqueaderoController extends Controller
{
    public function index()
    {
        $parqueaderos = Parqueadero::all();
        return response()->json($parqueaderos);
    }

    public function store(Request $request)
    {
       //Validacion
       $request->validate([
           'direccion' => 'required',
           'LtnLng'=> 'required',
           'tarifa' => 'required',
           'vehiculos' => 'required',
           'imagenUrl' => 'required',
       ]);

       //Guardar en la BD
       $parqueadero = Parqueadero::create([
            'direccion' => $request->direccion,
            'LtnLng' => $request->LtnLng,
            'tarifa' => $request->tarifa,
            'vehiculos' => $request->vehiculos,
            'imagenUrl' => $request->imagenUrl,
            'cupos' => $request->cupos,
            'activo' => $request->activo,
            'uid' => $request->uid
       ]);

       //Retornar respuesta
       return response()->json($parqueadero);
    }

    public function update(Request $request, Parqueadero $parqueadero)
    {
       //Validacion
       $request->validate([
           'direccion' => 'required',
           'LtnLng' => 'required',
           'tarifa' => 'required',
           'vehiculos' => 'required',
           'imagenUrl' => 'required',
       ]);

       //Actualizar en la BD
       $parqueadero->update([
            'direccion' => $request->direccion,
            'LtnLng' => $request->LtnLng,
            'tarifa' => $request->tarifa,
            'vehiculos' => $request->vehiculos,
            'imagenUrl' => $request->imagenUrl,
            'cupos' => $request->cupos,
            'activo' => $request->activo,
            'uid' => $request->uid
       ]);

       //Retornar respuesta
       return response()->json($parqueadero);
    }
}
