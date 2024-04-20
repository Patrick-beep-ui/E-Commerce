<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShowOrderController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\WhishListController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::view('/react','react_app.main');
Route::post('/login', function(Request $request){
    if(Auth::check()) return response()->json(['msg' => "You are already authenticated", "user" => Auth::user()], 200);
    $validator = Validator::make($request->all(), [
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);
    if($validator->fails()) return response()->json(['errros' => $validator->errors()],400);
    if(Auth::attempt(["email" => $request->email, "password" => $request->password])){
        $request->session()->regenerate();
        return response()->json(["user" => Auth::user()], 200);
    }
    return response()->json(['errros' => 'Email or Password Incorrect'],400);
})->name('login');
Route::middleware(['auth:sanctum', 'is.admin'])->get('/products', function () {
    $products = Product::all();

    return response()->json(['products'=> $products],200);
});
Route::get('/logout', function () {
    Auth::logout();
    return response()->json(['is_auth' => Auth::check()], 200);
});

Route::get('/check', function () {
    Auth::check();
    return response()->json(['is_user_auth' => Auth::check()], 200);
});

//Sign-Up Function
Route::post('/signup', [UserController::class, 'signup'])->name('signup');

//Controller Routes
Route::get('/sproduct/show/{name}/{price}/{imgUrl}/{category}', [ProductController::class, 'show'])->name('product.show');
Route::get('/catalog/items',[ProductController::class,'catalog'])->name('catalog.show');
Route::get('/catalog/variations',[ProductController::class,'variations'])->name('variations.show');
Route::get('react/orders/items',[ShowOrderController::class,'orders'])->name('orders.show');
Route::get('react/admin/orders/{userId}', [AdminOrderController::class, 'adminOrders'])->name('admin.orders');
Route::get('react/whishlist/items', [WhishlistController::class, 'show'])->name('whishlist.items');

//Route::middleware(['auth:sanctum', 'is.admin'])->get('/admin/orders/{userId}', [ShowOrderController::class, 'adminOrders'])->name('admin.orders');

Route::get('react/users',[UserController::class,'getUsers'])->middleware('is.admin')->name('users.show');
// web.php or api.php

Route::post('/place-order', [OrderController::class, 'store']);
Route::post('/add-to-whishlist', [WhishListController::class, 'store']);


// Routes
Route::view('/catalog', 'catalog')->name('catalog');
Route::view('/sproduct', 'sproduct')->name('sproduct');
Route::view('/login', 'login')->name('login');
Route::view('/payment', 'payment')->name('payment');
Route::view('/index', 'index')->name('home');
Route::view('/orders', 'orders')->name('orders');
Route::view('/admin-orders', 'admin-orders')->name('admin-orders');
Route::view('/user-info', 'user-info')->name('user-info');


Route::middleware(['auth:sanctum'])->group(function(){
    Route::post("/purchase", function(Request $request){
        $validator = Validator::make($request->all(),[
            "products" => ['required','array'],
            "products.*.id" => ['required', 'integer','exists:products,id', 'min:1'],
            "products.*.quantity" => ['required', 'integer','min:1'],
            "user_id" => ["required","integer","exists:users,id", 'min:1']
        ]);
        if($validator->fails()) return response()->json(["errors" => $validator->errors()],400);
        $user = $request->user();
        $order = Order::create([
            "user_id" => $user->id
        ]);
        foreach($request->products as $requestedProduct){
            $product = Product::find($requestedProduct["id"]);
            if(!$product || ($product->stock < $requestedProduct["quantity"])) continue;
            OrderItem::create([
                "order_id" => $order->id,
                "product_id" => $requestedProduct["id"],
                "quantity" => $requestedProduct["quantity"],
                "price" => $product->price
            ]);
            $product->stock -= $requestedProduct["quantity"];
            $product->save();
        }
        return response()->json(["message" => "products added successfully","products" => $order->products()],200);
    });
});
// Define a catch-all route for other paths, including 'index'
Route::view('/{path}', 'react_app.main')->where('path', '.*');





