<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;
class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = \CodeShopping\Models\Category::all();

        factory(Product::class, 30)
            ->create()
            ->each(function (Product $product) use ($categories){
                $j = rand(1,3);
                for ($i = 0; $i < $j; $i++){
                    $categoryId = $categories->random()->id;

                    $product->categories()->attach($categoryId);
                }
            });
    }
}
