<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'telefone',
        "e-mail",
        "data_de_nascimento",
        "genero"
    ];

    public function turma()
    {
        return $this->hasOne(related: Alunosdeturmas::class, foreignKey: 'aluno_id');
    }

    protected static function booted()
    {
        static::addGlobalScope('ordered', function (Builder $builder) {
            $builder->orderBy('nome');
        });
    }
}
