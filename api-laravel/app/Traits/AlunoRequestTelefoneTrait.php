<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait AlunoRequestTelefoneTrait
{
    public function str_replace(Request $request): string
    {
        $sub = str_replace("(", "", $request->input('telefone'));
        $sub = str_replace(")", "", $sub);
        $sub = str_replace(" ", "", $sub);
        $sub = str_replace("-", "", $sub);
        $telefone = $sub;
        
        return $telefone;
    }
}