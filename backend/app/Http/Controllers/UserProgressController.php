<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return UserProgress::where('user_id', auth()->id())
            ->with('lesson')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show($id)
    {
        return UserProgress::with('lesson')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy(UserProgress $progress)
    {
        $progress->delete();

        return response()->noContent();
    }
    public function isCompleted($userId, $lessonId)
    {
        return UserProgress::where('user_id', $userId)
            ->where('lesson_id', $lessonId)
            ->exists();
    }
}
