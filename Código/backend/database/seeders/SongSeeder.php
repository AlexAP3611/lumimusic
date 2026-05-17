<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Song::insert([
            [
                'title' => 'Canción 1',
                'artist' => 'Artista 1',
                'difficulty' => 'Principiante',
                'url' => 'https://example.com/song1.mp3',
            ],
            [
                'title' => 'Canción 2',
                'artist' => 'Artista 2',
                'difficulty' => 'Intermedio',
                'url' => 'https://example.com/song2.mp3',
            ],
            [
                'title' => 'Canción 3',
                'artist' => 'Artista 3',
                'difficulty' => 'Avanzado',
                'url' => 'https://example.com/song3.mp3',
            ]
        ]);
    }
}
