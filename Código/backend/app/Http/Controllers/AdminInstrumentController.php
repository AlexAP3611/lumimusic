<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use Illuminate\Http\Request;

class AdminInstrumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'instrument_name' => 'required|string|max:100'
        ]);

        return Instrument::create($request->all());
    }

    public function update(Request $request, Instrument $instrument)
    {
        $request->validate([
            'instrument_name' => 'required|string|max:100'
        ]);

        $instrument->update($request->all());
        return $instrument;
    }

    public function destroy($id)
    {
        Instrument::destroy($id);
        return response()->json(['message' => 'Deleted'], 204);
    }
}
