<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShowOrderController extends Controller
{
    public function orders()
    {
        $orders = OrderItem::select(
            'orders.id as order_id',
            'orders.user_id',
            'orders.status',
            'order_items.quantity',
            'order_items.price',
            'products.name as product_name',
            DB::raw("CONCAT(products.path,'.jpg') as product_image"),
            'categories.name as category_name',
            'orders.created_at as date'
        )
        ->leftJoin('orders', 'orders.id', '=', 'order_items.order_id')
        ->leftJoin('products', 'products.id', '=', 'order_items.product_id')
        ->leftJoin('categories', 'categories.id', '=', 'products.category_id')
        ->where('orders.user_id', Auth::user()->id)
        ->get()->groupBy('order_id');

        // Iterate through each order and modify the 'date' field
        foreach ($orders as $orderId => $orderItems) {
            foreach ($orderItems as $orderItem) {
                $orderItem->date = [
                    'creation_date' => date('Y-m-d', strtotime($orderItem->date)),
                    'hour' => date('H:i:s', strtotime($orderItem->date)),
                ];
            }
        }

        return response()->json(['orders' => $orders], 200);
    }
}
