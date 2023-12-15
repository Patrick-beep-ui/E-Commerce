<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;




class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function users():BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    public function orders(): BelongsToMany 
    {
        return $this->belongsToMany(Order::class);
    }

    public function orderItems():HasMany 
    {
        return $this->hasMany(OrderItem::class);
    }
}
