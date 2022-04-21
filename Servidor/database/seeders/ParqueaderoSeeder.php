<?php

namespace Database\Seeders;

use App\Models\Parqueadero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParqueaderoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parqueadero::create([
            "cupos" => "5",
            "uid" => "lhbdpXlwEqXKejw9agcEVEAitcp2",
            "direccion" => "Calle 17 c # 13 c 17 int 1",
            "tarifa" => "100$ por minuto",
            "vehiculos" => "Bicicletas/Motos/Carros",
            "imagenUrl" => "https://www.misabogados.com.co/hubfs/Imported_Blog_Media/parqueaderos-2.jpg"
        ]);

        Parqueadero::create([
            "cupos" => "8",
            "uid" => "lhbdpXlwEqXKejw9agcEVEAitcp2",
            "direccion" => "Calle 18 c # 14 c 18",
            "tarifa" => "50$ por minuto",
            "vehiculos" => "Motos/Carros",
            "imagenUrl" => "https://www.carroya.com/noticias/sites/default/files/entradillas/439917513carrosparqueados.jpg"
        ]);
    }
}
