<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstrumentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\TablatureController;
use App\Http\Controllers\UserProgressController;
use App\Models\Instrument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::resource('/songs', SongController::class);
    Route::resource('/courses', CourseController::class);
    Route::resource('/instruments', InstrumentController::class);
    Route::resource('/lessons', LessonController::class);
    Route::resource('/tablatures', TablatureController::class);

    Route::get('/progress', [UserProgressController::class, 'index']);
    Route::post('/progress', [UserProgressController::class, 'store']);
    Route::put('/progress/{progress}', [UserProgressController::class, 'update']);
    Route::delete('/progress/{progress}', [UserProgressController::class, 'destroy']);

    Route::get('/instruments/{instrument}/courses', function (Instrument $instrument) {
        return $instrument->courses;
    });
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

