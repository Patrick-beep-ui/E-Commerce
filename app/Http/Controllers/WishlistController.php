<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist; // Change from WhishList to Wishlist
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller // Change class name from WhishListController to WishlistController
{
    public function store($product_id, $user_id)
    {
        // Validate the user_id and product_id
        $validator = Validator::make(['user_id' => $user_id, 'product_id' => $product_id], [
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Check if the product is already in the user's wishlist
        $exists = Wishlist::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Product is already in the wishlist',
            ], 409); // Conflict status code
        }

        // Create a new wishlist entry
        $wishlist = Wishlist::create([
            'user_id' => $user_id,
            'product_id' => $product_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product added to wishlist',
            'data' => $wishlist,
        ], 201); // Created status code
    }

    public function show()
    {
        $wishlist = Wishlist::select( // Change from WhishList to Wishlist
            'wishlist.id as wishlist_id',
            'wishlist.user_id',
            'wishlist.created_at as date',
            'products.name as product_name',
            'wishlist.product_id as product_id',
            DB::raw("CONCAT(products.path, '.jpg') AS product_image")
        )
        ->leftJoin('products', 'products.id', '=', 'wishlist.product_id') // Change from whishlist to wishlist
        ->where('wishlist.user_id', Auth::user()->id)
        ->groupBy('wishlist_id')
        ->get();

        return response()->json(['wishlist' => $wishlist], 200); // Change from whishlist to wishlist
    }
}
