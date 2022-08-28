<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Aluno;

interface AlunoRepository
{
    public function add(Request $request): Aluno;
    public function update(Request $request, $id): Aluno;
}
