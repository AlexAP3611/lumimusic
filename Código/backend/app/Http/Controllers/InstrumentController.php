<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use Illuminate\Http\Request;

class InstrumentController extends Controller
{
    /**
     * Obtiene la lista de todos los instrumentos.
     *
     * @return \Illuminate\Database\Eloquent\Collection Colección de instrumentos.
     */
    public function index()
    {
        return Instrument::all();
    }

    /**
     * Almacena un nuevo instrumento en la base de datos.
     *
     * Valida los datos recibidos y crea un nuevo instrumento.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return Instrument Instrumento creado.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'instrument_name' => 'required|string|max:150'
        ]);

        return Instrument::create($validated);
    }

    /**
     * Muestra los cursos asociados a un instrumento específico.
     *
     * @param Instrument $instrument Instrumento del que se obtendrán los cursos.
     * @return \Illuminate\Database\Eloquent\Collection Colección de cursos del instrumento.
     */
    public function show(Instrument $instrument)
    {
        return $instrument->courses;
    }

    /**
     * Actualiza un instrumento existente en la base de datos.
     *
     * Valida los datos recibidos y actualiza el instrumento especificado.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Instrument $instrument Instrumento que se desea actualizar.
     * @return Instrument Instrumento actualizado.
     */
    public function update(Request $request, Instrument $instrument)
    {
        $validated = $request->validate([
            'instrument_name' => 'required|string|max:150',
        ]);

        $instrument->update($validated);

        return $instrument;
    }

    /**
     * Elimina un instrumento de la base de datos.
     *
     * @param Instrument $instrument Instrumento que se desea eliminar.
     * @return \Illuminate\Http\Response Respuesta vacía con código 204.
     */
    public function destroy(Instrument $instrument)
    {
        $instrument->delete();

        return response()->noContent();
    }

    /**
     * Obtiene un instrumento junto con sus cursos asociados.
     *
     * Los cursos se cargan ordenados por identificador.
     *
     * @param Instrument $instrument Instrumento del que se obtendrán los cursos.
     * @return Instrument Instrumento con sus cursos cargados.
     */
    public function courses(Instrument $instrument)
    {
        return $instrument->load([
            'courses' => function ($query) {
                $query->orderBy('id');
            }
        ]);
    }
}
