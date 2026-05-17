<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Song;
class SongController extends Controller
{
    /**
     * Obtiene la lista de todas las canciones.
     *
     * @return \Illuminate\Database\Eloquent\Collection Colección de canciones.
     */
    public function index()
    {
        return Song::all();
    }

    /**
     * Muestra la información de una canción específica.
     *
     *
     * @param Song $song Canción que se desea mostrar.
     * @return Song Canción.
     */
    public function show(Song $song)
    {
        return $song;
    }

    /**
     * Almacena una nueva canción en la base de datos.
     *
     * Valida los datos recibidos y crea una nueva canción.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return Song Canción creada.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'artist' => 'required|string|max:150',
            'difficulty' => 'nullable|string',
            'url' => 'nullable|string'
        ]);

        return Song::create($validated);
    }

    /**
     * Actualiza una canción existente en la base de datos.
     *
     * Actualiza únicamente los campos permitidos de la canción especificada.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Song $song Canción que se desea actualizar.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con la canción actualizada.
     */
    public function update(Request $request, Song $song)
    {
        $song->update($request->only([
            'title',
            'artist',
            'difficulty',
            'url'
        ]));
        return response()->json($song, 200);
    }

    /**
     * Elimina una canción de la base de datos.
     *
     * @param Song $song Canción que se desea eliminar.
     * @return \Illuminate\Http\JsonResponse Respuesta vacía con código 204.
     */
    public function destroy(Song $song)
    {
        $song->delete();
        return response()->json(null, 204);
    }

    /**
     * Obtiene las tablaturas asociadas a una canción específica.
     *
     * Devuelve todas las tablaturas de la canción indicada,
     * incluyendo la información del instrumento asociado a cada una.
     *
     * @param Song $song Canción de la que se obtendrán las tablaturas.
     * @return \Illuminate\Database\Eloquent\Collection Colección de tablaturas con su instrumento.
     */
    public function tablatures(Song $song)
    {
        return $song->tablatures()->with('instrument')->get();
    }
}
