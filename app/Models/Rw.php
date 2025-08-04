<?php

namespace App\Models;

use App\Http\Services\Region\RegionService;
use App\Models\Scopes\WhereRwScope;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Rw extends Tenant
{
    protected static function booted(): void
    {
        parent::booted();
        static::addGlobalScope(new WhereRwScope);

        static::saving(function (self $model) {
            $regionService = app(RegionService::class);
            $province = $regionService->getProvinces($model->province_id);
            if (!$province) {
                throw new NotFoundHttpException("Province not found");
            }
            $model->province_name = $province->resource['nama'];

            $city = $regionService->getCities($model->city_id);
            if (!$city) {
                throw new NotFoundHttpException("City not found");
            }
            $model->city_name = $city->resource['nama'];

            $district = $regionService->getDistricts($model->district_id);
            if (!$district) {
                throw new NotFoundHttpException("district not found");
            }
            $model->district_name = $district->resource['nama'];

            $village = $regionService->getVillages($model->village_id);
            if (!$village) {
                throw new NotFoundHttpException("village not found");
            }
            $model->village_name = $village->resource['nama'];
        });
    }
}
