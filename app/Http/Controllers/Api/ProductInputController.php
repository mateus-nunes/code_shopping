<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductInput;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{

    public function index()
    {
        $inputs = ProductInput::with('product')->paginate(20);

        return ProductInputResource::collection($inputs);
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
