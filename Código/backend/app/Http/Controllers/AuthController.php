<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Registra un nuevo usuario en la aplicación.
     *
     * Valida los datos recibidos, crea el usuario y genera un token de autenticación.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con el usuario y el token generado.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Inicia sesión de un usuario en la aplicación.
     *
     * Valida las credenciales recibidas y genera un token de autenticación
     * si el inicio de sesión es correcto.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con el usuario y el token generado.
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validated)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Cierra la sesión del usuario autenticado.
     *
     * Elimina el token de acceso actual del usuario.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando el cierre de sesión.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    /**
     * Cambia la contraseña del usuario autenticado.
     *
     * Valida la contraseña actual y actualiza con la nueva.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando el cambio.
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password'     => 'required|string|min:6|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Contraseña actual incorrecta'], 401);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => 'Contraseña actualizada correctamente']);
    }
}
