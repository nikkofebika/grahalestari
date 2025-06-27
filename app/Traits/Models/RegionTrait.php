<?php

namespace App\Traits\Models;

use App\Http\Services\Region\RegionService;
use Exception;

trait RegionTrait
{

    public function getAllRegion()
    {
        $this->province = $this->province;
        $this->city = $this->city;
        $this->district = $this->district;
        $this->village = $this->village;
    }

    public function getProvinceAttribute(): array | null
    {
        return $this->getProvince();
    }

    public function getCityAttribute(): array | null
    {
        return $this->getCity();
    }

    public function getDistrictAttribute(): array | null
    {
        return $this->getDistrict();
    }

    public function getVillageAttribute(): array | null
    {
        return $this->getVillage();
    }

    public function getProvince(): array | null
    {
        try {
            $data = app(RegionService::class)->getProvinces($this->province_id);
            return $data?->resolve() ?? null;
        } catch (Exception $e) {
            return null;
        }
    }

    public function getCity(): array | null
    {
        try {
            $data = app(RegionService::class)->getCities($this->city_id);
            return $data?->resolve() ?? null;
        } catch (Exception $e) {
            return null;
        }
    }

    public function getDistrict(): array | null
    {
        try {
            $data = app(RegionService::class)->getDistricts($this->district_id);
            return $data?->resolve() ?? null;
        } catch (Exception $e) {
            return null;
        }
    }

    public function getVillage(): array | null
    {
        try {
            $data = app(RegionService::class)->getVillages($this->village_id);
            return $data?->resolve() ?? null;
        } catch (Exception $e) {
            return null;
        }
    }
}
