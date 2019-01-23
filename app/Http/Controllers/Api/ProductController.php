<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use CodeShopping\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;

class ProductController extends Controller
{

    public function index()
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($query);
        $products = $query->paginate(20);

        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();
        $product->refresh();

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([],204);
    }

    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([],204);
    }

    private function onlyTrashedIfRequested(Builder $query)
    {
        if(Request::get('trashed') == 1)
        {
            $query = $query->onlyTrashed();
        }

        return $query;
    }
}
