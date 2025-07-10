<?php

namespace App\Http\Controllers\Api;

use App\Enums\OpenApiTags;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\Api\DefaultApiResource;
use App\OpenApi\RequestBodies\Auth\TokenRequestBody;
use App\OpenApi\Responses\Auth\TokenResponse;
use Vyuldashev\LaravelOpenApi\Attributes as OpenApi;

#[OpenApi\PathItem]
class AuthController extends Controller
{
    /**
     * Get token
     *
     * Get a JWT via given credentials.
     */
    #[OpenApi\Operation(id: 'AuthToken', tags: [OpenApiTags::AUTH->value])]
    #[OpenApi\RequestBody(factory: TokenRequestBody::class)]
    #[OpenApi\Response(factory: TokenResponse::class, statusCode:202)]
    public function token(LoginRequest $request)
    {
        if (! $token = auth('api')->attempt($request->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return new DefaultApiResource([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
