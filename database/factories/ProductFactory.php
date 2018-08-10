<?php

use Faker\Generator as Faker;

$factory->define(\CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName,
        'description' => $faker->paragraph,
        'price' => $faker->numberBetween(0,500)
    ];
});
