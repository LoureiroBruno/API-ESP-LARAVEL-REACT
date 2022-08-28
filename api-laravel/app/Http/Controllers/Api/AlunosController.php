<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aluno;
use App\Repositories\EloquentAlunoRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlunosController extends Controller
{
    public function __construct(private EloquentAlunoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        $students = Aluno::all();
        return response()->json([
            'status' => 200,
            'students' => $students
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nome' => 'required|max:191',
            'e_mail'=> 'required|email|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $this->repository->add($request);
            return response()->json([
                'status' => 201,
                'message' => 'Aluno criado com Sucesso!'
            ]);
        }
    }

    public function show(int $id)
    {
        $student = Aluno::find($id);

        if ($student) {
            return response()->json([
                'status' => 200,
                'student' => $student
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aluno não encontrado"
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'nome' => 'required|max:191',
            'e_mail'=> 'required|email|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $student = Aluno::find($id);
            if ($student) {
                $this->repository->update($request, $id);
                return response()->json([
                    'status' => 204,
                    'message' => 'Aluno atualizado com Sucesso!'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Aluno não encontrado"
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $student = Aluno::find($id);
        $student->delete();

        return response()->json([
            'status' => 204,
            'message' => 'Aluno excluído com Sucesso!'
        ]);
    }
}
