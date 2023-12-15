<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            if($user && Auth::attempt(["email" => $request->email,"password"=> $request->password])){
                $request->session()->regenerate();
                return response()->json([
                    'user' => Auth::user(),
                ], 201);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Couldn\'t register user',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUsers(Request $request) {
        //$users = $request->user();
        $users = User::select(
            'users.id as user_id',
            'users.name as user_name',
            'users.email as user_email',
            'users.is_admin as user_is_admin',
            'users.password as user_password'
        )
        ->get()->groupBy('user_id');
        return response()->json(['users' => $users], 200);

    }
}
