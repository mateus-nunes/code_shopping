<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductPhotoRequest;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{

    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }


    public function store(Product $product, ProductPhotoRequest $request)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);

        return new ProductPhotoCollection($photos, $product);
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        if($photo->product_id != $product->id)
            abort(404, 'Photo not found');

        return new ProductPhotoResource($photo);
    }

    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        if($photo->product_id != $product->id)
            abort(404, 'Photo not found');

        $photo->updateWithPhoto($request->file('photo'));

        return new ProductPhotoResource($photo->refresh());
    }

    public function destroy(Product $product, ProductPhoto $photo)
    {
        if($photo->product_id != $product->id)
            abort(404, 'Photo not found');

        $photo->deleteWithPhoto();

        return response()->json([new ProductResource($product)],204);
    }
}
