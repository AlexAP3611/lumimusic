<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Song;
class SongController extends Controller
{
    public function index()
    {
        return Song::all();
    }
    /*
     * @extends \Illuminate\Database\Eloquent\Model
     */
    public function show(Song $song)
    {
        return $song->load('tablatures');
    }

    public function store(Request $request)
    {
        $song = Song::create($request->only([
            'title',
            'artist',
            'difficulty',
            'url'
        ]));
        return response()->json($song, 201);
    }

    public function update(Request $request, Song $song)
    {
        $song->update($request->only([
            'title',
            'artist',
            'difficulty',
            'url'
        ]));
        return response()->json($song, 200);
    }

    public function destroy(Song $song)
    {
        $song->delete();
        return response()->json(null, 204);
    }
}
