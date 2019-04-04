<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductOutputFilter;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Models\ProductOutput;
use CodeShopping\Traits\OnlyTrashed;
use Illuminate\Http\Request;

class ProductOutputController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        $filter = app(ProductOutputFilter::class);

        $filterQuery = ProductOutput::filtered($filter);

        $filterQuery = $this->onlyTrashedIfRequested($filterQuery);

        $perPage = $request->has('per-page') ? $request->get('per-page') : 20;

        $outputs = $filter->hasFilterParameter() ?
            $filterQuery->get() :
            $filterQuery->paginate($perPage);

        return ProductOutputResource::collection($outputs);
    }

    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());

        return new ProductOutputResource($output);
    }

    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
