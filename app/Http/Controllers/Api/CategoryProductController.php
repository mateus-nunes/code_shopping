<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\CategoryProductRequest;
use CodeShopping\Http\Resources\CategoryProductResource;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;

class CategoryProductController extends Controller
{
    public function index(Category $category)
    {
        return new CategoryProductResource($category);
    }

    public function store(CategoryProductRequest $request, Category $category)
    {
        $changed = $category->products()->sync($request->products);

        $attached = $changed['attached'];

        $products = Product::whereIn('id', $attached)->get();

        return $products->count() > 0 ? response()->json(new CategoryProductResource($category),201) : [];
    }

    public function destroy(Category $category, Product $product)
    {
        $category->products()->detach($product->id);

        return response()->json([],204);
    }
}
