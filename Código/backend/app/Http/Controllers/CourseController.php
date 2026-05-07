<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Course::all();
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
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
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }

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
