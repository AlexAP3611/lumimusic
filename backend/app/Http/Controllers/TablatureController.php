<?php

namespace App\Http\Controllers;

use App\Models\Tablature;
use Illuminate\Http\Request;

class TablatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Tablature::with(['song', 'instrument'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'song_id' => 'required|exists:songs,id',
            'instrument_id' => 'required|exists:instruments,id',
            'content' => 'required|string'
        ]);

        $tablature = Tablature::create($validated);

        return response()->json($tablature, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tablature $tablature)
    {
        return $tablature::load(['song', 'instrument']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tablature $tablature)
    {
        $validated = $request->validate([
            'content' => 'sometimes|string'
        ]);

        $tablature->update($validated);

        return $tablature;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tablature $tablature)
    {
        $tablature->delete();

        return response()->noContent();
    }
}
