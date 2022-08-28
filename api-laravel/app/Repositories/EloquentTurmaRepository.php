<?php

namespace App\Repositories;

use App\Models\Turma;
use Illuminate\Http\Request;

class EloquentTurmaRepository implements TurmaRepository
{
    public function add(Request $request): Turma
    {
        $turma = Turma::create($request->all());

        return $turma;
    }

    public function update(Request $request, $id): Turma
    {
        $turma = Turma::find($id);
        $turma->ano_de_execução = $request->input('ano_de_execução');
        $turma->nível_de_ensino = $request->input('nível_de_ensino');
        $turma->série = $request->input('série');
        $turma->turno = $request->input('turno');
        $turma->save();

        return $turma;
    }

    // public function update(Turma $turma, Request $request)
    // {
    //     $turma->fill($request->all());
    //     $turma->save();

    //     return $turma;
    // }
}
