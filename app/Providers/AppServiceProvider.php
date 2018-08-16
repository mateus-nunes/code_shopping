<?php

namespace CodeShopping\Providers;

use CodeShopping\Models\ProductInput;
use CodeShopping\Models\ProductOutput;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(250);

        //Evento disparado quando for feita a entrada de um produto
        ProductInput::created(function($input){
            $input->product->stock += $input->amount;
            $input->product->save();
        });

        //Evento disparado quando for feita a saida de um produto
        ProductOutput::created(function($output){
            $output->product->stock -= $output->amount;

            if($output->product->stock < 0)
                throw new \Exception('O estoque de ' . $output->product->name . ' não pode ser negativo');

            $output->product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
