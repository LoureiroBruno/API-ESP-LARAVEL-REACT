<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alunosdeturmas extends Model
{
    use HasFactory;
    protected $table = 'alunosdeturmas';
    protected $connection = 'mysql';

    protected $fillable = [
        'aluno_id',
        'turma_id',
    ];

    public function Aluno()
    {
        return $this->BelongsTo(Aluno::class);
    }

    public function Turma()
    {
        return $this->BelongsTo(Turma::class);
    }
}
