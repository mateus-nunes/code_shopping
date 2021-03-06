<?php

namespace CodeShopping\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id','product_name','amount','created_at'];

    protected function applySearch($value){
        $this->query->where('name','LIKE', "%${value}%");
    }

    protected function applySortProductName($order){
        $this->query->orderBy('products.name',$order);
    }

    protected function applySortCreatedAt($order){
        $this->query->orderBy('product_outputs.created_at',$order);
    }

    public function hasFilterParameter(){
        $contains = $this->parser->getFilters()->contains(function ($filter){
            return $filter->getField() === 'search' && ! empty($filter->getValue());
        });
        return $contains;
    }

    /**
     * @param Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($query)
    {
        $query = $query->join('products','products.id','=','product_outputs.product_id')
            ->select('product_outputs.*');

        return parent::apply($query); // TODO: Change the autogenerated stub
    }
}