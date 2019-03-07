<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['id','name','slug','search'];

    protected $simpleSorts = ['id','name','price','created_at','updated_at'];

    protected function applySearch($value){
        $this->query->where('name','LIKE', "%${value}%")
            ->orWhere('description','LIKE',"%${value}%");
    }
}