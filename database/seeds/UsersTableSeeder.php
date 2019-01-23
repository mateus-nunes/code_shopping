<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class,1)
            ->create([
                'email' => 'admin@email.com',
                'password' => 1234
            ]);

        factory(User::class, 10)
            ->create();
    }
}
