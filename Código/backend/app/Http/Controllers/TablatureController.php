<?php

namespace App\Http\Controllers;

use App\Models\Tablature;
use Illuminate\Http\Request;

class TablatureController extends Controller
{
    /**
     * Obtiene la lista de todas las tablaturas.
     *
     * Incluye la información de la canción y el instrumento asociados.
     *
     * @return \Illuminate\Database\Eloquent\Collection Colección de tablaturas.
     */
    public function index()
    {
        return Tablature::with(['song', 'instrument'])->get();
    }

    /**
     * Almacena una nueva tablatura en la base de datos.
     *
     * Valida los datos recibidos y crea una nueva tablatura.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con la tablatura creada.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'song_id' => 'required|exists:songs,id',
            'instrument_id' => 'required|exists:instruments,id',
            'content' => 'required|string'
        ]);

        $tablature = Tablature::create($validated);

        return response()->json($tablature, 201);
    }

    /**
     * Muestra la información de una tablatura específica.
     *
     * Incluye la canción y el instrumento asociados.
     *
     * @param Tablature $tablature Tablatura que se desea mostrar.
     * @return \Illuminate\Database\Eloquent\Model Tablatura con relaciones cargadas.
     */
    public function show(Tablature $tablature)
    {
        return $tablature::load(['song', 'instrument']);
    }

    /**
     * Actualiza una tablatura existente en la base de datos.
     *
     * Valida los datos recibidos y actualiza la tablatura especificada.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Tablature $tablature Tablatura que se desea actualizar.
     * @return Tablature Tablatura actualizada.
     */
    public function update(Request $request, Tablature $tablature)
    {
        $validated = $request->validate([
            'song_id' => 'required|exists:songs,id',
            'instrument_id' => 'required|exists:instruments,id',
            'content' => 'sometimes|string'
        ]);

        $tablature->update($validated);

        return $tablature;
    }

    /**
     * Elimina una tablatura de la base de datos.
     *
     * @param Tablature $tablature Tablatura que se desea eliminar.
     * @return \Illuminate\Http\Response Respuesta vacía con código 204.
     */
    public function destroy(Tablature $tablature)
    {
        $tablature->delete();

        return response()->noContent();
    }
}
