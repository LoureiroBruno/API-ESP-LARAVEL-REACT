<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turma;
use App\Repositories\EloquentTurmaRepository;
use Illuminate\Support\Facades\Validator;

class TurmasController extends Controller
{
    public function __construct(private EloquentTurmaRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        $turmas = Turma::all();
        return response()->json([
            'status' => 200,
            'turmas' => $turmas
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'ano_de_execução' => 'max:4',
            'série' => 'max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $this->repository->add($request);
            return response()->json([
                'status' => 201,
                'message' => 'Turma criada com Sucesso!'
            ]);
        }
    }

    public function show(int $id)
    {
        $turma = Turma::find($id);

        if ($turma) {
            return response()->json([
                'status' => 200,
                'turma' => $turma
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Turma não encontrado"
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'ano_de_execução' => 'max:4',
            'série' => 'max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $turma = Turma::find($id);
            if ($turma) {
                $this->repository->update($request, $id);
                return response()->json([
                    'status' => 204,
                    'message' => 'Turma atualizado com Sucesso!'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Turma não encontrado"
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $student = Turma::find($id);
        $student->delete();

        return response()->json([
            'status' => 204,
            'message' => 'Turma excluído com Sucesso!'
        ]);
    }
}
