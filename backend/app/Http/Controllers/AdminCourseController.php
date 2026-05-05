<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class AdminCourseController extends Controller
{
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

    public function destroy($id)
    {
        Course::destroy($id);
        return response()->json(['message' => 'Deleted'], 204);
    }
}
