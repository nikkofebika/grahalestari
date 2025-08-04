<?php

namespace App\Http\Services\Region;

use App\Http\Resources\GeneralResource;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RegionService
{
    public function getProvinces(?int $id = null)
    {
        $url = 'https://raw.githubusercontent.com/nikkofebika/indonesian-regional-data/refs/heads/main/provinces.json';

        $response = Http::get($url);

        if ($response->failed()) {
            throw new NotFoundHttpException("Provinces not found");
        }

        $data = $response->object();

        if (is_object($data)) {
            return new GeneralResource((array)$data);
        }

        $data = $response->json();

        if ($id) {
            return new GeneralResource(collect($data)->firstWhere('id', $id));
        }

        $data = GeneralResource::collection($data);

        return $data;
    }

    public function getCities(int $id)
    {
        $url = 'https://raw.githubusercontent.com/nikkofebika/indonesian-regional-data/refs/heads/main/cities/' . $id . '.json';
        $response = Http::get($url);

        if ($response->failed()) {
            throw new NotFoundHttpException("Cities not found");
        }

        $data = $response->object();

        if (is_object($data)) {
            return new GeneralResource((array)$data);
        }

        return GeneralResource::collection($response->json());
    }

    public function getDistricts(int $id)
    {
        $url = 'https://raw.githubusercontent.com/nikkofebika/indonesian-regional-data/refs/heads/main/districts/' . $id . '.json';

        $response = Http::get($url);

        if ($response->failed()) {
            throw new NotFoundHttpException("Districts not found");
        }

        $data = $response->object();

        if (is_object($data)) {
            return new GeneralResource((array)$data);
        }

        return GeneralResource::collection($response->json());
    }

    public function getVillages(int $id)
    {
        $url = 'https://raw.githubusercontent.com/nikkofebika/indonesian-regional-data/refs/heads/main/villages/' . $id . '.json';

        $response = Http::get($url);

        if ($response->failed()) {
            throw new NotFoundHttpException("Villages not found");
        }

        $data = $response->object();

        if (is_object($data)) {
            return new GeneralResource((array)$data);
        }

        return GeneralResource::collection($response->json());
    }
}
