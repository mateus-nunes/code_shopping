<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Http\Filters\UserFilter;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use CodeShopping\Traits\OnlyTrashed;
use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        $filter = app(UserFilter::class);

        $filterQuery = User::filtered($filter);

        $filterQuery = $this->onlyTrashedIfRequested($filterQuery);

        if($request->has('all')):
            return UserResource::collection($filterQuery->get());
        endif;

        $perPage = $request->has('per-page') ? $request->get('per-page') : 20;

        return UserResource::collection($filterQuery->paginate($perPage));
    }

    public function store(UserRequest $request)
    {
        \DB::beginTransaction();

        $user = User::create($request->all());
        $user->refresh();

        event(new UserCreatedEvent($user));

        \DB::commit();

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
}
