<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TurmasRequest;
use App\Models\Turma;

class TurmasController extends Controller
{
    public function index()
    {
        return response()->json(Turma::all(), 200);
    }

    public function store(TurmasRequest $request)
    {
        return response()
        ->json(Turma::create($request->all()), 201);
    }

    public function show(int $turma)
    {
        $turma = Turma::find($turma);
        if($turma === null) {
            return response()->json(
                ['message'=>'Turma não encontrado'],
                404
            );
        }
        return $turma;
    }

    public function update(Turma $turma, TurmasRequest $request)
    {
        $turma->fill($request->all());
        $turma->save();

        return $turma;
    }

    public function destroy(int $turma)
    {
        Turma::destroy($turma);
        return response()->noContent();
    }
}
