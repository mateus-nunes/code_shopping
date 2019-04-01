<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductInputFilter;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;
use CodeShopping\Traits\OnlyTrashed;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{

    use OnlyTrashed;

    public function index(Request $request)
    {
        $filter = app(ProductInputFilter::class);

        $filterQuery = ProductInput::filtered($filter);

        $filterQuery = $this->onlyTrashedIfRequested($filterQuery);

        if($request->has('all')):
            return ProductInputResource::collection($filterQuery->get());
        endif;

        return ProductInputResource::collection($filterQuery->paginate(20));
    }

    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());

        return new ProductInputResource($input);
    }

    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }

}
