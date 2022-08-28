<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Turma;

interface TurmaRepository
{
    public function add(Request $request): Turma;
    public function update(Request $request, $id): Turma;
}
