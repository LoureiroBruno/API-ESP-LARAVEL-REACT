<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{
    use HasFactory;

    protected $fillable = [
        'ano_de_execução',
        'nível_de_ensino',
        "série",
        "turno"
    ];

    public function aluno()
    {
        return $this->hasOne(related: Alunosdeturmas::class, foreignKey: 'turma_id');
    }

    protected static function booted()
    {
        static::addGlobalScope('ordered', function (Builder $builder) {
            $builder->orderBy('nível_de_ensino')->orderBy('série');
        });
    }
}
