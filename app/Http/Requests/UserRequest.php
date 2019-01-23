<?php

namespace CodeShopping\Http\Requests;

use CodeShopping\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = $this->route('user');

        $id = $user ? $user->id : null;

        $rules = [
            'name' => 'required',
            'email' => [
                "required",
                "email",
                Rule::unique('users')->ignore($id)
            ]
        ];

        if($user){
            return array_merge($rules, $this->rulesUpdate());
        }

        return array_merge($rules, $this->rulesCreate());
    }

    private function rulesCreate()
    {
        return [
            'password' => 'required|confirmed|min:4'
        ];
    }

    private function rulesUpdate()
    {
        return [
            'password' => 'nullable|confirmed|min:4'
        ];
    }
}
