<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Obtiene la lista de todos los cursos.
     *
     * @return \Illuminate\Database\Eloquent\Collection Colección de cursos.
     */
    public function index()
    {
        return Course::all();
    }

    /**
     * Almacena un nuevo curso en la base de datos.
     *
     * Valida los datos recibidos y crea un nuevo curso.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return Course Curso creado.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'instrument_id' => 'required|exists:instruments,id',
            'course_name' => 'required|string',
            'course_description' => 'nullable|string',
            'level' => 'nullable|string'
        ]);

        return Course::create($validated);
    }

    /**
     * Muestra la información de un curso específico.
     *
     * Carga las lecciones ordenadas por posición y añade el estado
     * de completado de cada lección para el usuario autenticado.
     *
     * @param Course $course Curso que se desea mostrar.
     * @return Course Curso con sus lecciones y progreso del usuario.
     */
    public function show(Course $course)
    {
        $course->load(['lessons' => function ($query) {
            $query->orderBy('position');
        }]);

        $userId = auth()->id();

        foreach ($course->lessons as $lesson) {
            $lesson->completed = UserProgress::where('user_id', $userId)
                ->where('lesson_id', $lesson->id)
                ->exists();
        }

        return $course;
    }

    /**
     * Actualiza un curso existente en la base de datos.
     *
     * Valida los datos recibidos y actualiza el curso especificado.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param Course $course Curso que se desea actualizar.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con el curso actualizado.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'course_name' => 'sometimes|string|max:150',
            'course_description' => 'nullable|string',
            'level' => 'nullable|string|max:20'
        ]);

        $course->update($validated);

        return response()->json($course, 201);
    }

    /**
     * Elimina un curso de la base de datos.
     *
     * @param Course $course Curso que se desea eliminar.
     * @return \Illuminate\Http\JsonResponse Respuesta vacía con código 204.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }

    /**
     * Obtiene los cursos asociados a los instrumentos del usuario autenticado.
     *
     * @return \Illuminate\Support\Collection Colección de cursos únicos del usuario.
     */
    public function myCourses()
    {
        $user = auth()->user();

        return $user->instruments()
            ->with('courses')
            ->get()
            ->pluck('courses')
            ->flatten()
            ->unique('id')
            ->values();
    }
}
