<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlunosTurmasRequest;
use App\Models\Alunosdeturmas;

class AlunosTurmasController extends Controller
{

    public function index(Alunosdeturmas $alunosdeturmas)
    {
        return response()->json([
            'status' => 200,
            'relacao' =>  $alunosdeturmas->with('aluno','turma')->get(),
        ]);
    }

    public function store(AlunosTurmasRequest $request)
    {
        return response()
        ->json(Alunosdeturmas::create($request->all()), 201);
    }

}
