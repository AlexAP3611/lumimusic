<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * Obtiene la lista de todas las lecciones.
     *
     * Incluye la información del curso asociado a cada lección.
     *
     * @return \Illuminate\Database\Eloquent\Collection Colección de lecciones.
     */
    public function index()
    {
        return Lesson::with('course')->get();
    }

    /**
     * Almacena una nueva lección en la base de datos.
     *
     * Valida los datos recibidos y crea una nueva lección.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con la lección creada.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'lesson_name' => 'required|string|max:150',
            'lesson_description' => 'nullable|string',
            'position' => 'sometimes|integer',
        ]);

        $lesson = Lesson::create($validated);

        return response()->json($lesson, 201);
    }

    /**
     * Muestra la información de una lección específica.
     *
     * Incluye la información del curso asociado.
     *
     * @param Lesson $lesson Lección que se desea mostrar.
     * @return Lesson Lección con el curso cargado.
     */
    public function show(Lesson $lesson)
    {
        return $lesson->load('course');
    }

    /**
     * Actualiza una lección existente en la base de datos.
     *
     * Valida los datos recibidos y actualiza la lección especificada.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Lesson $lesson Lección que se desea actualizar.
     * @return Lesson Lección actualizada.
     */

    public function update(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'lesson_name' => 'sometimes|string|max:150',
            'lesson_description' => 'nullable|string',
            'course_id' => 'sometimes|exists:courses,id',
            'position' => 'sometimes|integer',
        ]);

        $lesson->update($validated);

        return $lesson;
    }

    /**
     * Elimina una lección de la base de datos.
     *
     * @param Lesson $lesson Lección que se desea eliminar.
     * @return \Illuminate\Http\Response Respuesta vacía con código 204.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->noContent();
    }
}
