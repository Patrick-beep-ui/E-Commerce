<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;



class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $products = $request->input('products');

        // Create a new order
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'checkout',
        ]);

        // Create order items for each product
        foreach ($products as $product) {
            $productModel = Product::find($product['id']);
            if ($productModel) {
                if ($productModel->stock < $product['quantity']) {
                    continue; // Skip if the quantity is not reasonable
                }

                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $productModel->id,
                    'quantity' => $product['quantity'],
                    'price' => $productModel->price,
                ]);

                // Update product stock after placing the order
                $productModel->stock -= $product['quantity'];
                $productModel->save();

                $orderItem->save();
            }
        }

        // Payment logic

        return response()->json(['message' => 'Order placed successfully'], 200);
    }
}