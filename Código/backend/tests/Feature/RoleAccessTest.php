<?php

namespace Tests\Feature;

use App\Models\Song;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Pruebas de integración de control de acceso por roles - I-01 a I-06
 * Ejecución: php artisan test --filter=RoleAccessTest
 */
class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    private function adminUser(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    private function regularUser(): User
    {
        return User::factory()->create(['role' => 'user']);
    }

    // -------------------------------------------------------
    // I-01: Usuario sin autenticar accede a ruta protegida
    // -------------------------------------------------------
    public function test_I01_usuario_sin_autenticar_en_ruta_protegida(): void
    {
        $response = $this->getJson('/api/songs');

        $response->assertStatus(401);
    }

    // -------------------------------------------------------
    // I-02: Usuario 'user' intenta eliminar una canción
    // -------------------------------------------------------
    public function test_I02_usuario_regular_no_puede_eliminar_cancion(): void
    {
        $song = Song::factory()->create();

        $response = $this->actingAs($this->regularUser())
                         ->deleteJson("/api/admin/songs/{$song->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('songs', ['id' => $song->id]);
    }

    // -------------------------------------------------------
    // I-03: Usuario 'admin' elimina una canción
    // -------------------------------------------------------
    public function test_I03_admin_puede_eliminar_cancion(): void
    {
        $song = Song::factory()->create();

        $response = $this->actingAs($this->adminUser())
                         ->deleteJson("/api/admin/songs/{$song->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('songs', ['id' => $song->id]);
    }

    // -------------------------------------------------------
    // I-04: Usuario 'user' accede a su propio progreso
    // -------------------------------------------------------
    public function test_I04_usuario_normal_accede_a_su_progreso(): void
    {
        $user = $this->regularUser();

        $response = $this->actingAs($user)
                         ->getJson("/api/progress");

        $response->assertStatus(200);
    }

    // -------------------------------------------------------
    // I-05: Admin accede al listado completo de usuarios
    // -------------------------------------------------------
    public function test_I05_admin_accede_al_listado_de_usuarios(): void
    {
        User::factory()->count(3)->create(['role' => 'user']);

        $response = $this->actingAs($this->adminUser())
                         ->getJson('/api/admin/users');

        $response->assertStatus(200);
    }

    // -------------------------------------------------------
    // I-06: Usuario 'user' intenta acceder al listado de usuarios
    // -------------------------------------------------------
    public function test_I06_usuario_normal_no_puede_ver_listado_usuarios(): void
    {
        $response = $this->actingAs($this->regularUser())
                         ->getJson('/api/admin/users');

        $response->assertStatus(403);
    }
}
