<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class ProductOutput extends Model
{
    use Filterable;

    protected $fillable = ['product_id','amount'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
