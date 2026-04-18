<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use Illuminate\Http\Request;

class InstrumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Instrument::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'instrument_name' => 'required|string|max:150'
        ]);

        return Instrument::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Instrument $instrument)
    {
        return $instrument->courses;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Instrument $instrument)
    {
        $validated = $request->validate([
            'instrument_name' => 'required|string|max:150',
        ]);

        $instrument->update($validated);

        return $instrument;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Instrument $instrument)
    {
        $instrument->delete();

        return response()->noContent();
    }
}
