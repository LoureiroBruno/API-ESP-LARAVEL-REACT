<?php

namespace App\Repositories;

use App\Models\Aluno;
use App\Traits\AlunoRequestTelefoneTrait;
use Illuminate\Http\Request;

class EloquentAlunoRepository implements AlunoRepository
{
    use AlunoRequestTelefoneTrait;

    public function add(Request $request): Aluno
    {
        $telefone = $this->str_replace($request);
        $student = new Aluno();
        $student->nome = $request->input('nome');
        $student->telefone = $telefone;
        $student->e_mail = $request->input('e_mail');
        $student->data_de_nascimento = $request->input('data_de_nascimento');
        $student->genero = $request->input('genero');
        $student->save();

        return $student;
    }

    public function update(Request $request, $id): Aluno
    {
        $telefone = $this->str_replace($request);
        $student = Aluno::find($id);
        $student->nome = $request->input('nome');
        $student->telefone = $telefone;
        $student->e_mail = $request->input('e_mail');
        $student->data_de_nascimento = $request->input('data_de_nascimento');
        $student->genero = $request->input('genero');
        $student->save();

        return $student;
    }
}
