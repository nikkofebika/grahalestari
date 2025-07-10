<?php

namespace App\Http\Controllers\Api;

use App\Enums\OpenApiTags;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\Api\User\UserResource;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use App\OpenApi\Parameters\User\UserIndexParameters;
use App\OpenApi\RequestBodies\User\UserStoreRequestBody;
use App\OpenApi\RequestBodies\User\UserUpdateRequestBody;
use App\OpenApi\Responses\CreatedResponse;
use App\OpenApi\Responses\DeletedResponse;
use App\OpenApi\Responses\UpdatedResponse;
use App\OpenApi\Responses\User\UserIndexResponse;
use App\OpenApi\Responses\User\UserShowResponse;
use Illuminate\Support\Facades\Gate;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Vyuldashev\LaravelOpenApi\Attributes as OpenApi;

#[OpenApi\PathItem]
class UserController extends Controller
{
    public function __construct(protected UserServiceInterface $service)
    {
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     */
    #[OpenApi\Operation(id: 'UserIndex', tags: [OpenApiTags::USER->value])]
    #[OpenApi\Parameters(factory: UserIndexParameters::class)]
    #[OpenApi\Response(factory: UserIndexResponse::class)]
    public function index()
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            null,
            [
                AllowedFilter::scope('search')
            ],
            [
                AllowedInclude::callback('tenant', fn($q) => $q->selectMinimalist())
            ],
            ['id', 'name'],
            ['id', 'name'],
            true
        );

        return UserResource::collection($datas);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OpenApi\Operation(id: 'UserStore', tags: [OpenApiTags::USER->value])]
    #[OpenApi\RequestBody(factory: UserStoreRequestBody::class)]
    #[OpenApi\Response(factory: CreatedResponse::class)]
    public function store(StoreRequest $request)
    {
        Gate::authorize('create', User::class);

        $this->service->create($request->validated());
        return $this->createdResponse();
    }

    /**
     * Display the specified resource.
     */
    #[OpenApi\Operation(id: 'UserShow', tags: [OpenApiTags::USER->value])]
    #[OpenApi\Response(factory: UserShowResponse::class)]
    public function show(string $id)
    {
        Gate::authorize('view', User::class);

        $user = $this->service->findById($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    #[OpenApi\Operation(id: 'UserUpdate', tags: [OpenApiTags::USER->value])]
    #[OpenApi\RequestBody(factory: UserUpdateRequestBody::class)]
    #[OpenApi\Response(factory: UpdatedResponse::class)]
    public function update(UpdateRequest $request, string $id)
    {
        Gate::authorize('update', User::class);

        $this->service->update($id, $request->validated());
        return $this->updatedResponse();
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OpenApi\Operation(id: 'UserDelete', tags: [OpenApiTags::USER->value])]
    #[OpenApi\Response(factory: DeletedResponse::class)]
    public function destroy(string $id)
    {
        Gate::authorize('delete', User::class);

        $this->service->delete($id);
        return $this->deletedResponse();
    }
}
