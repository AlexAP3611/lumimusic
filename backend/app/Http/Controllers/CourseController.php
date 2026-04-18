<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'level' => 'nullable|string|max:20'
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return $course->load(['lessons' => function ($query) {
            $query->orderBy('position');
        }]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:150',
            'description' => 'nullable|string',
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
}
