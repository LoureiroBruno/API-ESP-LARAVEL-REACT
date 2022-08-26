<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TurmasRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /** validation login */
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'série' =>  'max:10',
            'turno' => 'max:5'
        ];
    }
}
