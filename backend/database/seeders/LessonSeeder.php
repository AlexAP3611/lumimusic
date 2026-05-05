<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::pluck('id', 'course_name');

        $lessons = [
            [
                'course_name' => 'Curso básico de guitarra',
                'lesson_name' => 'Lección básica guitarra',
                'lesson_description' => 'Lección básica de la guitarra',
                'position' => 1
            ],
            [
                'course_name' => 'Curso intermedio de guitarra',
                'lesson_name' => 'Lección intermedia guitarra',
                'lesson_description' => 'Lección intermedia de la guitarra',
                'position' => 1
            ],
            [
                'course_name' => 'Curso avanzado de guitarra',
                'lesson_name' => 'Lección avanzada guitarra',
                'lesson_description' => 'Lección avanzada de la guitarra',
                'position' => 1
            ],
            [
                'course_name' => 'Curso básico de bajo',
                'lesson_name' => 'Lección básica bajo',
                'lesson_description' => 'Lección básica del bajo',
                'position' => 1
            ],
            [
                'course_name' => 'Curso intermedio de bajo',
                'lesson_name' => 'Lección intermedia bajo',
                'lesson_description' => 'Lección intermedia del bajo',
                'position' => 1
            ],
            [
                'course_name' => 'Curso avanzado de bajo',
                'lesson_name' => 'Lección avanzada bajo',
                'lesson_description' => 'Leccion avanzada del bajo',
                'position' => 1
            ],
            [
                'course_name' => 'Curso básico de batería',
                'lesson_name' => 'Lección básico batería',
                'lesson_description' => 'Lección básica de la batería',
                'position' => 1
            ],
            [
                'course_name' => 'Curso intermedio de batería',
                'lesson_name' => 'Lección intermedia batería',
                'lesson_description' => 'Lección intermedia de la batería',
                'position' => 1
            ],
            [
                'course_name' => 'Curso avanzado de batería',
                'lesson_name' => 'Lección avanzada batería',
                'lesson_description' => 'Lección avanzada de la batería',
                'position' => 1
            ],
            [
                'course_name' => 'Curso básico de teclado',
                'lesson_name' => 'Lección básica teclado',
                'lesson_description' => 'Lección básica del teclado',
                'position' => 1
            ],
            [
                'course_name' => 'Curso intermedio de teclado',
                'lesson_name' => 'Lección intermedia teclado',
                'lesson_description' => 'Lección intermedia del teclado',
                'position' => 1
            ],
            [
                'course_name' => 'Curso avanzado de teclado',
                'lesson_name' => 'Lección avanzada teclado',
                'lesson_description' => 'Lección avanzada del teclado',
                'position' => 1
            ]
        ];

        foreach ($lessons as $lessonData) {
            $courseId = $courses[$lessonData['course_name']];

            if ($courseId) {
                Lesson::create([
                    'course_id' => $courseId,
                    'lesson_name' => $lessonData['lesson_name'],
                    'lesson_description' => $lessonData['lesson_description'],
                    'position' => $lessonData['position'],
                ]);
            }
        }
    }
}
