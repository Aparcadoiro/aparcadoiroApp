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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('uid');
            $table->string('placa');
            $table->string('pid');
            $table->string('dia_ingreso');
            $table->string('hora_ingreso');
            $table->string('hora_salida')->nullable();
            $table->boolean('confirmUser')->default(false);
            $table->boolean('confirmParqueadero')->default(false);
            $table->boolean('estado')->default(true);
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
        Schema::dropIfExists('reservas');
    }
};
