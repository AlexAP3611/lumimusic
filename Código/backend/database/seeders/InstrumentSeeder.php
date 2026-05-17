<?php

namespace Database\Seeders;

use App\Models\Instrument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstrumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Instrument::insertOrIgnore([
            [
            'instrument_name' => 'Guitarra',
            'image_url' => '/images/instruments/guitarra.png',
            ],
            [
            'instrument_name' => 'Bajo',
            'image_url' => '/images/instruments/bajo.png',
            ],
            [
            'instrument_name' => 'Batería',
            'image_url' => '/images/instruments/bateria.png',
            ],
            [
            'instrument_name' => 'Teclado',
            'image_url' => '/images/instruments/teclado.png',
            ]
        ]);
    }
}
