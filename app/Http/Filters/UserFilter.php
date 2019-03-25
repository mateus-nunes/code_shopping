<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['id','name','slug','search'];

    protected $simpleSorts = ['id','name','email','created_at','updated_at'];

    protected function applySearch($value){
        $this->query->where('name','LIKE', "%${value}%")
            ->orWhere('email','LIKE',"%${value}%");
    }
}