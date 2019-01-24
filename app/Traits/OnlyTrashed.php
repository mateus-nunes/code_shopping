<?php

namespace CodeShopping\Traits;

use  Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Builder $query)
    {
        if(Request::get('trashed') == 1)
        {
            $query = $query->onlyTrashed();
        }

        return $query;
    }
}