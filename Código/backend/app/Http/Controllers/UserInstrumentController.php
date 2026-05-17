<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserInstrumentController extends Controller
{
    /**
     * Obtiene los instrumentos asociados al usuario autenticado.
     *
     * Devuelve la relación de instrumentos del usuario actual.
     *
     * @return \Illuminate\Database\Eloquent\Collection Lista de instrumentos del usuario.
     */
    public function index()
    {
        return auth()->user()->instruments;
    }

    /**
     * Asocia un instrumento al usuario autenticado.
     *
     * Valida el instrumento recibido y lo añade al usuario sin eliminar
     * los ya existentes, asignando un nivel inicial por defecto.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando la operación.
     */
    public function store(Request $request)
    {
        $request->validate([
            'instrument_id' => 'required|exists:instruments,id'
        ]);

        auth()->user()
            ->instruments()
            ->syncWithoutDetaching([$request->instrument_id => ['level' => 'Principiante']]);

        return response()->json(['message' => 'Instrument added']);
    }

    /**
     * Elimina un instrumento asociado al usuario autenticado.
     *
     * Desvincula el instrumento indicado del usuario actual.
     *
     * @param int $id ID del instrumento que se desea eliminar.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando la eliminación.
     */
    public function destroy($id)
    {
        $user = auth()->user();

        $user->instruments()->detach($id);

        return response()->json([
            'message' => 'Instrument removed'
        ]);
    }
}
