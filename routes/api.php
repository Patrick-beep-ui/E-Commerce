<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//"/api/login"
Route::post('/login', function (Request $request) {
    $validator = Validator::make(
        $request->all(),
        [
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]
    );
    if ($validator->fails()) return response()->json(["errors" => $validator->errors()], 400);
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json(["token" => $user->createToken($request->device_name)->plainTextToken], 200);
});

Route::get('http://127.0.0.1:8000//catalog/items', [ProductController::class, 'catalog'])->name('catalog.show');

Route::prefix('api')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::put('/cart/update/{productName}', [CartController::class, 'updateCart']);
    Route::delete('/cart/remove/{productName}', [CartController::class, 'removeFromCart']);
    Route::post('/orders/place', [OrderController::class, 'placeOrder']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
