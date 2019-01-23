<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use CodeShopping\Http\Controllers\Controller;

class UserController extends Controller
{

    public function index()
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($query);
        $users = $query->paginate(20);

        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        $user->refresh();

        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        $user->refresh();

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([],204);
    }

    private function onlyTrashedIfRequested(Builder $query)
    {
        if(Request::get('trashed') == 1)
        {
            $query = $query->onlyTrashed();
        }

        return $query;
    }
}
