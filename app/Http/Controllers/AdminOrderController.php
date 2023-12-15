<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class AdminOrderController extends Controller
{
    public function adminOrders(Request $request, $userId)
    {
        $selectedUserId = $userId;

        $adminOrders = OrderItem::select(
            'orders.id as order_id',
            'orders.user_id',
            'orders.status',
            'order_items.quantity',
            'order_items.price',
            'products.name as product_name',
            'categories.name as category_name'
        )
            ->leftJoin('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('products', 'products.id', '=', 'order_items.product_id')
            ->leftJoin('categories', 'categories.id', '=', 'products.category_id')
            ->where('orders.user_id', $selectedUserId)
            ->get()
            ->groupBy('order_id');

        return response()->json(['orders' => $adminOrders], 200);
    }
}
