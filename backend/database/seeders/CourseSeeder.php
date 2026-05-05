<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Instrument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $instruments = Instrument::whereIn('instrument_name', ['Guitarra','Bajo','Batería','Teclado'])
            ->pluck('id', 'instrument_name');

        Course::insert([
            [
                'instrument_id' => $instruments['Guitarra'],
                'course_name' => 'Curso básico de guitarra',
                'course_description' => 'Aprende la teoría básica de la guitarra',
                'level' => 'Principiante',
                'image_url' => '/images/courses/guitarra-basico.png'
            ],
            [
                'instrument_id' => $instruments['Guitarra'],
                'course_name' => 'Curso intermedio de guitarra',
                'course_description' => 'Aprende a tocar la guitarra a nivel experimentado ',
                'level' => 'Intermedio',
                'image_url' => '/images/courses/guitarra-intermedio.png'
            ],
            [
                'instrument_id' => $instruments['Guitarra'],
                'course_name' => 'Curso avanzado de guitarra',
                'course_description' => 'Aprende a tocar la guitarra a nivel avanzado',
                'level' => 'Avanzado',
                'image_url' => '/images/courses/guitarra-avanzado.png'
            ],
            [
                'instrument_id' => $instruments['Bajo'],
                'course_name' => 'Curso básico de bajo',
                'course_description' => 'Aprende la teoría básica del bajo ',
                'level' => 'Principiante',
                'image_url' => '/images/courses/bajo-basico.png'
            ],
            [
                'instrument_id' => $instruments['Bajo'],
                'course_name' => 'Curso intermedio de bajo',
                'course_description' => 'Aprende a tocar el bajo a nivel experimentado ',
                'level' => 'Intermedio',
                'image_url' => '/images/courses/bajo-intermedio.png'
            ],
            [
                'instrument_id' => $instruments['Bajo'],
                'course_name' => 'Curso avanzado de bajo',
                'course_description' => 'Aprende a tocar el bajo a nivel avanzado',
                'level' => 'Avanzado',
                'image_url' => '/images/courses/bajo-avanzado.png'
            ],
            [
                'instrument_id' => $instruments['Batería'],
                'course_name' => 'Curso básico de batería',
                'course_description' => 'Aprende la teoría básica de la batería',
                'level' => 'Principiante',
                'image_url' => '/images/courses/bateria-basico.png'
            ],
            [
                'instrument_id' => $instruments['Batería'],
                'course_name' => 'Curso intermedio de batería',
                'course_description' => 'Aprende a tocar la batería a nivel experimentado',
                'level' => 'Intermedio',
                'image_url' => '/images/courses/bateria-intermedio.png'
            ],
            [
                'instrument_id' => $instruments['Batería'],
                'course_name' => 'Curso avanzado de batería',
                'course_description' => 'Aprende a tocal la batería a nivel avanzado',
                'level' => 'Avanzado',
                'image_url' => '/images/courses/bateria-avanzado.png'
            ],
            [
                'instrument_id' => $instruments['Teclado'],
                'course_name' => 'Curso básico de teclado',
                'course_description' => 'Aprende la teoría básica del teclado',
                'level' => 'Principiante',
                'image_url' => '/images/courses/teclado-basico.png'
            ],
            [
                'instrument_id' => $instruments['Teclado'],
                'course_name' => 'Curso intermedio de teclado',
                'course_description' => 'Aprende a tocar el teclado a nivel experimentado',
                'level' => 'Intermedio',
                'image_url' => '/images/courses/teclado-intermedio.png'
            ],
            [
                'instrument_id' => $instruments['Teclado'],
                'course_name' => 'Curso avanzado de teclado',
                'course_description' => 'Aprende a tocar el teclado a nivel avanzado',
                'level' => 'Avanzado',
                'image_url' => '/images/courses/teclado-avanzado.png'
            ]
        ]);
    }
}
