<?php

use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class ProductPhotosSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->deleteAllPhotosInProductsPath();

        $this->allFakerPhotos = $this->getFakersPhotos();

        $products = Product::all();
        $self = $this;
        $products->each(function($product) use ($self){
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function getFakersPhotos()
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(File::allFiles($path));
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($productId)
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16 ) . '.' . $photoFile->getExtension()
        );

        ProductPhoto::uploadFiles($productId, [$uploadFile]);

        return $uploadFile->hashName();
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        File::deleteDirectory(storage_path($path),true);
    }

    private function createPhotoDir(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        File::makeDirectory($path, 0777,true);
    }

    private function createPhotosModels(Product $product)
    {
        for ($i = 0; $i < 5; $i++)
        {
            $this->createPhotoModel($product);
        }
    }

    private function createPhotoModel(Product $product)
    {
       $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'image.jpg'
        ]);

       $photo->file_name = $this->generatePhoto($photo);
    }
}
