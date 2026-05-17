<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use Illuminate\Http\Request;

class AdminInstrumentController extends Controller
{
    /**
     * Almacena un nuevo instrumento en la base de datos.
     *
     * Valida los datos recibidos en la petición y crea un nuevo instrumento.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return Instrument Instrumento creado.
     */
    public function store(Request $request)
    {
        $request->validate([
            'instrument_name' => 'required|string|max:100'
        ]);

        return Instrument::create($request->all());
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
        $request->validate([
            'instrument_name' => 'required|string|max:100'
        ]);

        $instrument->update($request->all());
        return $instrument;
    }

    /**
     * Elimina un instrumento de la base de datos.
     *
     * @param int $id Identificador del instrumento.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando la eliminación.
     */
    public function destroy($id)
    {
        Instrument::destroy($id);
        return response()->json(['message' => 'Deleted'], 204);
    }
}
