<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Whishlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class WhishlistController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $productId = $request->input('product_id');

        // Add product to wishlist
        $whishlist = Whishlist::create([
            'user_id' => $user->id,
            'product_id' => $productId,
        ]);

        return response()->json($whishlist, 201);
    } 

    public function show()
    {
    
        $whishlist = Whishlist::select(
            'whishlist.id as wishlist_id',
            'whishlist.user_id',
            'whishlist.created_at as date',
            'products.name as product_name',
            DB::raw("CONCAT(products.path, '.jpg') AS product_image")
        )
        ->leftJoin('products', 'products.id', '=', 'whishlist.product_id')
        ->where('whishlist.user_id', Auth::user()->id)
        ->groupBy('wishlist_id')
        ->get();
        

        return response()->json(['whishlist' => $whishlist], 200);
    }
}
