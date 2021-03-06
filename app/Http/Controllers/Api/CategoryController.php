<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\CategoryFilter;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $filter = app(CategoryFilter::class);

        $filterQuery = Category::filtered($filter);

        if($request->has('all')):
            return CategoryResource::collection($filterQuery->get());
        endif;

        $perPage = $request->has('per-page') ? $request->get('per-page') : 20;

        return CategoryResource::collection($filterQuery->paginate($perPage));
    }


    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());

        $category->refresh();

        return new CategoryResource($category);
    }


    public function show(Category $category)
    {
        return new CategoryResource($category);
    }


    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();

        $category->refresh();

        return new CategoryResource($category);
    }


    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([],204);
    }
}
