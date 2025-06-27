<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Http\Services\Region\RegionService;

class RegionController extends Controller
{
    public function __construct(private RegionService $service) {}

    /**
     * Get all provinces in Indonesia or a single province by ID
     *
     * @param int|null $id The ID of the province to retrieve
     *
     * @return DefaultResource
     */
    public function getProvinces(?int $id = null)
    {
        $data = $this->service->getProvinces($id);
        return $data;
    }

    /**
     * Get all cities in Indonesia by province ID or city ID
     *
     * @param int $id The ID of the province to retrieve cities for
     *
     * @return DefaultResource
     */
    public function getCities(int $id)
    {
        $data = $this->service->getCities($id);
        return $data;
    }


    public function getDistricts(int $id)
    {
        $data = $this->service->getDistricts($id);
        return $data;
    }

    public function getVillages(int $id)
    {
        $data = $this->service->getVillages($id);
        return $data;
    }
}
