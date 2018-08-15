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

    public function index(Product $product)
    {
        return new ProductInputResource($product);
    }

    public function store(ProductInputRequest $request, Product $product)
    {
        $product->inputs()->create($request->all());

        $product->stock += $request->amount;
        $product->save();

        $product->refresh();

        return new ProductResource($product);
    }

}
