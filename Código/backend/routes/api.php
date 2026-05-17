<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstrumentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\TablatureController;
use App\Http\Controllers\UserInstrumentController;
use App\Http\Controllers\UserProgressController;
use App\Models\Instrument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/admin/instruments', [InstrumentController::class, 'store']);
        Route::put('/admin/instruments/{instrument}', [InstrumentController::class, 'update']);
        Route::delete('/admin/instruments/{instrument}', [InstrumentController::class, 'destroy']);

        Route::post('/admin/courses', [CourseController::class, 'store']);
        Route::put('/admin/courses/{course}', [CourseController::class, 'update']);
        Route::delete('/admin/courses/{course}', [CourseController::class, 'destroy']);

        Route::post('/admin/lessons', [LessonController::class, 'store']);
        Route::put('/admin/lessons/{lesson}', [LessonController::class, 'update']);
        Route::delete('/admin/lessons/{lesson}', [LessonController::class, 'destroy']);

        Route::post('/admin/songs', [SongController::class, 'store']);
        Route::put('/admin/songs/{song}', [SongController::class, 'update']);
        Route::delete('/admin/songs/{song}', [SongController::class, 'destroy']);

        Route::get('/admin/users', [UserController::class, 'index']);

        Route::put('/user/password', [AuthController::class, 'changePassword']);

    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::resource('/courses', CourseController::class);
    Route::resource('/instruments', InstrumentController::class);
    Route::resource('/lessons', LessonController::class);
    Route::resource('/tablatures', TablatureController::class);

    Route::get('/progress', [UserProgressController::class, 'index']);
    Route::post('/progress', [UserProgressController::class, 'store']);
    Route::put('/progress/{progress}', [UserProgressController::class, 'update']);
    Route::delete('/progress/{progress}', [UserProgressController::class, 'destroy']);
    Route::get('/progress/{progress}', [UserProgressController::class, 'show']);

    Route::get('/instruments/{instrument}/courses', [InstrumentController::class, 'courses']);
    Route::get('my-courses', [CourseController::class, 'myCourses']);

    Route::get('/user-instruments', [UserInstrumentController::class, 'index']);
    Route::post('/user-instruments', [UserInstrumentController::class, 'store']);
    Route::delete('/user-instruments/{userInstrument}', [UserInstrumentController::class, 'destroy']);

    Route::get('/songs', [SongController::class, 'index']);
    Route::get('/songs/{song}', [SongController::class, 'show']);

    Route::get('/songs/{song}/tablatures', [SongController::class, 'tablatures']);

});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

