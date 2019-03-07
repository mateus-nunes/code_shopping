<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Filters\ProductFilter;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Traits\OnlyTrashed;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    use OnlyTrashed;

    public function index(Request $request)
    {
        $filter = app(ProductFilter::class);

        $filterQuery = Product::filtered($filter);

        $filterQuery = $this->onlyTrashedIfRequested($filterQuery);

        if($request->has('all')):
            return ProductResource::collection($filterQuery->get());
        endif;

        return ProductResource::collection($filterQuery->paginate(20));
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
}
