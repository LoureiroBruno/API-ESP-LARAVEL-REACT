<?php

use App\Http\Controllers\Api\AlunosController;
use App\Http\Controllers\Api\TurmasController;
use App\Http\Controllers\Api\AlunosTurmasController;
use App\Models\Aluno;
use App\Models\Alunosdeturmas;
use App\Models\Turma;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('/alunos', AlunosController::class);
Route::apiResource('/turmas', TurmasController::class);
Route::apiResource('/alunosturma', AlunosTurmasController::class)->only(['index','store']);

/** buscar aluno por turma */
Route::get('/aluno/{aluno}/turma', function(Aluno $aluno){
    return response()->json($aluno->turma()->with('aluno','turma')->get());
});

/** buscar todos os alunos por turma */
Route::get('/turma/{turma}/alunos', function(Turma $turma){
    return response()->json($turma->aluno()->with('aluno')->get());
});
