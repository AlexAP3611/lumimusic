<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Obtiene la lista de todos los usuarios del sistema.
     *
     * Devuelve todos los usuarios registrados en formato JSON.
     * Este endpoint suele utilizarse para paneles de administración
     * o gestión interna de usuarios.
     *
     * @return \Illuminate\Http\JsonResponse Lista de usuarios en formato JSON.
     */
    public function index()
    {
        return response()->json(User::all());
    }
}
