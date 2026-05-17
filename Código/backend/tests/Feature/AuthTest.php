<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Pruebas unitarias de autenticación - U-01 a U-05
 * Ejecución: php artisan test --filter=AuthTest
 */
class AuthTest extends TestCase
{
    use RefreshDatabase;

    // -------------------------------------------------------
    // U-01: Registro de usuario con datos válidos
    // -------------------------------------------------------
    public function test_U01_registro_con_datos_validos(): void
    {
        $response = $this->postJson('/api/register', [
            'name'                  => 'Alejandro Aballe',
            'email'                 => 'alejandro@lumimusic.es',
            'password'              => 'abc123.',
            'password_confirmation' => 'abc123.',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'alejandro@lumimusic.es',
        ]);
    }

    // -------------------------------------------------------
    // U-02: Registro con email duplicado
    // -------------------------------------------------------
    public function test_U02_registro_con_email_duplicado(): void
    {
        User::factory()->create([
            'email' => 'alejandro@lumimusic.es',
        ]);

        $response = $this->postJson('/api/register', [
            'name'                  => 'Outro Usuario',
            'email'                 => 'alejandro@lumimusic.es',
            'password'              => 'abc123.',
            'password_confirmation' => 'abc123.',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    // -------------------------------------------------------
    // U-03: Registro con contraseña demasiado corta
    // -------------------------------------------------------
    public function test_U03_registro_con_contraseña_corta(): void
    {
        $response = $this->postJson('/api/register', [
            'name'                  => 'Alejandro Aballe',
            'email'                 => 'alejandro@lumimusic.es',
            'password'              => 'abc',
            'password_confirmation' => 'abc',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['password']);
    }

    // -------------------------------------------------------
    // U-04: Login con credenciales correctas
    // -------------------------------------------------------
    public function test_U04_login_con_credenciales_correctas(): void
    {
        User::factory()->create([
            'email'    => 'alejandro@lumimusic.es',
            'password' => bcrypt('abc123.'),
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'alejandro@lumimusic.es',
            'password' => 'abc123.',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    // -------------------------------------------------------
    // U-05: Login con contraseña incorrecta
    // -------------------------------------------------------
    public function test_U05_login_con_contraseña_incorrecta(): void
    {
        User::factory()->create([
            'email'    => 'alejandro@lumimusic.es',
            'password' => bcrypt('abc123.'),
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'alejandro@lumimusic.es',
            'password' => 'xxxxxx',
        ]);

        $response->assertStatus(401);
    }
}
