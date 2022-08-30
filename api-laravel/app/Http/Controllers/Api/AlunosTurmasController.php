<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alunosdeturmas;
use Illuminate\Support\Facades\Validator;

class AlunosTurmasController extends Controller
{

    public function index(Alunosdeturmas $alunosdeturmas)
    {
        return response()->json([
            'status' => 200,
            'relacao' =>  $alunosdeturmas->with('aluno','turma')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'aluno_id' => 'required',
            'turma_id'=> 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            Alunosdeturmas::create($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Matrícula realizada com Sucesso!'
            ]);
        }

    }

}
