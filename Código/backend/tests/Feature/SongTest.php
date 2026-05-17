<?php

namespace Tests\Feature;

use App\Models\Song;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Pruebas unitarias de CRUD de canciones - U-06 a U-10
 * Ejecución: php artisan test --filter=SongTest
 */
class SongTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Usuario admin autenticado reutilizable en los tests
     */
    private function adminUser(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    // -------------------------------------------------------
    // U-06: Creación de canción con datos válidos
    // -------------------------------------------------------
    public function test_U06_creacion_cancion_con_datos_validos(): void
    {
        $response = $this->actingAs($this->adminUser())
                         ->postJson('/api/admin/songs', [
                             'title'      => 'Bohemian Rhapsody',
                             'artist'     => 'Queen',
                             'difficulty' => 'Intermedio',
                         ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('songs', [
            'title' => 'Bohemian Rhapsody',
        ]);
    }

    // -------------------------------------------------------
    // U-07: Creación de canción sin título
    // -------------------------------------------------------
    public function test_U07_creacion_cancion_sin_titulo(): void
    {
        $response = $this->actingAs($this->adminUser())
                         ->postJson('/api/admin/songs', [
                             'artist'     => 'Queen',
                             'difficulty' => 'Intermedio',
                         ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title']);
    }

    // -------------------------------------------------------
    // U-08: Obtención de listado de canciones
    // -------------------------------------------------------
    public function test_U08_obtención_listado_canciones(): void
    {
        Song::factory()->count(3)->create();

        $response = $this->actingAs($this->adminUser())
                         ->getJson('/api/songs');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    // -------------------------------------------------------
    // U-09: Eliminación de canción existente
    // -------------------------------------------------------
    public function test_U09_eliminacion_cancion_existente(): void
    {
        $song = Song::factory()->create();

        $response = $this->actingAs($this->adminUser())
                         ->deleteJson("/api/admin/songs/{$song->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('songs', ['id' => $song->id]);
    }

    // -------------------------------------------------------
    // U-10: Obtención de canción inexistente
    // -------------------------------------------------------
    public function test_U10_obtención_cancion_inexistente(): void
    {
        $response = $this->actingAs($this->adminUser())
                         ->getJson('/api/songs/99999');

        $response->assertStatus(404);
    }
}
