<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Obtiene el progreso del usuario autenticado.
     *
     * Devuelve todas las lecciones que el usuario ha completado,
     * incluyendo la información de cada lección.
     *
     * @param Request $request Petición HTTP.
     * @return \Illuminate\Database\Eloquent\Collection Progreso del usuario con sus lecciones.
     */
    public function index(Request $request)
    {
        return UserProgress::where('user_id', auth()->id())
            ->with('lesson')
            ->get();
    }

    /**
     * Marca una lección como completada para el usuario autenticado.
     *
     * Si ya existe un registro de progreso, lo actualiza;
     * si no existe, lo crea.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @return UserProgress Registro de progreso creado o actualizado.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
        ]);

        $progress = UserProgress::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'lesson_id' => $validated['lesson_id']
            ],
            [
                'completed' => true
            ]
        );
        return $progress;
    }

    /**
     * Muestra un registro de progreso específico.
     *
     * Incluye la información de la lección asociada.
     *
     * @param int $id ID del registro de progreso.
     * @return UserProgress Registro de progreso encontrado.
     */
    public function show($id)
    {
        return UserProgress::with('lesson')->findOrFail($id);
    }

    /**
     * Actualiza un registro de progreso.
     *
     * Permite modificar el estado de completado de una lección.
     *
     * @param Request $request Datos enviados en la petición HTTP.
     * @param UserProgress $progress Registro de progreso a actualizar.
     * @return UserProgress Registro de progreso actualizado.
     */
    public function update(Request $request, UserProgress $progress)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);

        $progress->update($validated);

        return $progress;
    }

    /**
     * Elimina un registro de progreso del usuario.
     *
     * @param UserProgress $progress Registro de progreso a eliminar.
     * @return \Illuminate\Http\Response Respuesta vacía con código 204.
     */
    public function destroy(UserProgress $progress)
    {
        $progress->delete();

        return response()->noContent();
    }

    /**
     * Comprueba si un usuario ha completado una lección concreta.
     *
     * @param int $userId ID del usuario.
     * @param int $lessonId ID de la lección.
     * @return bool True si la lección está completada, false en caso contrario.
     */
    public function isCompleted($userId, $lessonId)
    {
        return UserProgress::where('user_id', $userId)
            ->where('lesson_id', $lessonId)
            ->exists();
    }
}
