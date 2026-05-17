<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class AdminCourseController extends Controller
{
    /**
     * Almacena un nuevo curso en la base de datos.
     *
     * Valida los datos recibidos en la petición y crea un nuevo curso.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return Course Curso creado.
     */
    public function store(Request $request)
    {
        $request->validate([
            'instrument_id' => 'required|exists:instruments,id',
            'course_name' => 'required|string|max:255',
            'course_description' => 'required|string',
            'level' => 'required|string|max:20',
        ]);

        return Course::create($request->all());
    }

    /**
     * Actualiza un curso existente en la base de datos.
     *
     * Valida los datos recibidos y actualiza el curso especificado.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Course $course Curso que se desea actualizar.
     * @return Course Curso actualizado.
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'instrument_id' => 'required|exists:instruments,id',
            'course_name' => 'required|string|max:255',
            'course_description' => 'required|string',
            'level' => 'required|string|max:20',
        ]);

        $course->update($request->all());
        return $course;
    }

    /**
     * Elimina un curso de la base de datos.
     *
     * @param int $id Identificador del curso.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON confirmando la eliminación.
     */
    public function destroy($id)
    {
        Course::destroy($id);
        return response()->json(['message' => 'Deleted'], 204);
    }
}
