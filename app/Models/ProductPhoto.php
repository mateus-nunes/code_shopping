<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['product_id','file_name'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

    public static function photosPath($productId)
    {
        return storage_path(self::PRODUCTS_PATH . '/' . $productId);
    }

    public static function photosDir($productId)
    {
        return self::DIR_PRODUCTS . '/' . $productId;
    }

    public static function createWithPhotosFiles(int $productId, array $files): Collection
    {
        try{
            self::uploadFiles($productId, $files);

            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            \DB::commit();

            return new Collection($photos);
        }catch (\Exception $e){
            \DB::rollBack();
            self::deleteFiles($productId, $files);
            throw $e;
        }
    }

    private static function deleteFiles(int $productId, array $files){
        $path = self::photosPath($productId);

        foreach ($files as $file){
            $photoPath = "{$path}/{$file->hashName()}";
            if(file_exists($photoPath)){
                \File::delete($photoPath);
            }
        }
    }

    private static function createPhotosModels(int $productId, array $files): array
    {
        $photos = [];

        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }

        return $photos;
    }

    public static function uploadFiles($productId, array $files)
    {
        $dir = self::photosDir($productId);

        foreach ($files as $file)
        {
            $file->store($dir,['disk' => 'public']);
        }
    }

    public static function uploadSingleFile($productId, $file)
    {
        $dir = self::photosDir($productId);

        $file->store($dir,['disk' => 'public']);
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);

        return asset('/storage/' . $path . '/' . $this->file_name);
    }

    public function updateWithPhoto(UploadedFile $file)
    {
        try{
            \DB::beginTransaction();

            self::uploadFiles($this->product_id, [$file]);

            $old_file = $this->file_name;

            $this->file_name = $file->hashName();
            $this->save();

            self::deleteSingleFile($this->product_id, $old_file);

            \DB::commit();
        }catch (\Exception $e){
            \DB::rollBack();
            throw $e;
        }
    }

    public function deleteWithPhoto()
    {
        try{
            \DB::beginTransaction();

            $file_name = $this->file_name;
            $product_id = $this->product_id;

            $this->delete();

            self::deleteSingleFile($product_id, $file_name);

            \DB::commit();
        }catch (\Exception $e){
            \DB::rollBack();
            throw $e;
        }
    }

    private static function deleteSingleFile(int $productId, $file_name){
        $path = self::photosPath($productId);

        $photoPath = "{$path}/{$file_name}";
        if(file_exists($photoPath)){
            \File::delete($photoPath);
        }
    }
}
