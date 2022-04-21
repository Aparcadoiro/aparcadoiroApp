<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        //Validacion
        $request->validate([
           'email' => 'required',
           'emailVerified' => 'true',
           'uid' => 'required',
        ]);

        //Guardar en la DB
        $users = User::create([
            'direccion' => $request->displayName,
            'email' => $request->email,
            'emailVerified' => $request->emailVerified,
            'uid' => $request->uid
       ]);

       //Devolver json
       return response()->json($users);
    }
}
