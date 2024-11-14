<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
class ProductController extends Controller
{
    public function show($name, $price, $imgUrl, $category, $colors)
    {
        return view('sproduct', compact($name, $price, $imgUrl, $category, $colors));
    }

    public function catalog()
    {
        $catalog = Category::select('categories.name as category_name','products.id as product_id', 'products.name','products.price','products.stock','products.description','products.colors',DB::raw("CONCAT(products.path,'.jpg') as path"))
        ->leftJoin('products', 'categories.id', 'products.category_id','products.colors')
            ->get()->groupBy('category_name');
        return response()->json(['catalog' => $catalog], 200);
    }

    public function variations($productId)
    {
        $variations = Category::join('products', 'categories.id', '=', 'products.category_id')
            ->leftJoin('product_variations', 'products.id', '=', 'product_variations.product_id')
            ->where('product_variations.product_id', $productId)
            ->select(
                'product_variations.id as variation_id',
                'products.id as product_id',
                'products.name as product_name',
                'product_variations.name as variation_name',
                'product_variations.path as path',
                'product_variations.color as color',
                'products.path as product_path',
                DB::raw("CONCAT(product_variations.path,'.jpg') as path")
            )
            ->get()
            ->groupBy('product_id');
    
        return response()->json(['variations' => $variations], 200);
    }
    
}
