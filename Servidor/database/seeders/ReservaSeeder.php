<?php

namespace Database\Seeders;

use App\Models\Reserva;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Reserva::create([
            "placa" => "QNC-02B",
            "uid" => "lhbdpXlwEqXKejw9agcEVEAitcp2",
            "pid" => "1",
            "dia_ingreso" => "Hoy",
            "hora_ingreso" => "3:00pm",
        ]);
    }
}
