<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = ['uid', 'pid', 'placa','dia_ingreso','hora_ingreso', 'hora_salida','confirmUser','confirmParqueadero','estado'];
    
}
