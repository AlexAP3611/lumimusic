<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserInstrumentController extends Controller
{
    public function index()
    {
        return auth()->user()->instruments;
    }

    public function store(Request $request)
    {
        $request->validate([
            'instrument_id' => 'required|exists:instruments,id'
        ]);

        auth()->user()
            ->instruments()
            ->syncWithoutDetaching([$request->instrument_id => ['level' => 'beginner']]);

        return response()->json(['message' => 'Instrument added']);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $user->instruments()->detach($id);

        return response()->json([
            'message' => 'Instrument removed'
        ]);
    }
}
