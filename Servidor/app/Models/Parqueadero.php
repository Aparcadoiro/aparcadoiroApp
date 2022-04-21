<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parqueadero extends Model
{
    use HasFactory;

    protected $fillable = ['direccion','tarifa','vehiculos','imagenUrl','cupos','activo', 'uid'];
}
