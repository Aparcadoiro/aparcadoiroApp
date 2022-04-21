<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Funcion para crear la tabla parqueaderos
        Schema::create('parqueaderos', function (Blueprint $table) {
            $table->id();
            $table->string('cupos'); //Campo de la tabla cupos
            $table->string('direccion'); //Campo de la tabla direccion
            $table->string('tarifa'); //Campo de la tabla tarifa
            $table->string('vehiculos'); //Campo de la tabla vehiculos
            $table->string('imagenUrl'); //Campo de la tabla donde se guarda el link de la imagen guardada en drive
            $table->boolean('activo')->default(true); //Campo de la tabla para definir el estado del parqueadero
            $table->string('uid'); //Campo de la tabla para definir la conexion entre el usuario y el parqueadero
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parqueaderos');
    }
};
