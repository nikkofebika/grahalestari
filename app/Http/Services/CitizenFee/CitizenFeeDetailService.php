<?php

namespace App\Http\Services\CitizenFee;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeDetailRepositoryInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeDetailServiceInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Models\CitizenFee;
use App\Models\CitizenFeeDetail;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CitizenFeeDetailService extends BaseService implements CitizenFeeDetailServiceInterface
{
    public function __construct(
        protected CitizenFeeDetailRepositoryInterface $repository,
        protected CitizenFeeServiceInterface $citizenFeeService,
    ) {
        parent::__construct($repository);
    }

    public function create(array $data): CitizenFeeDetail
    {
        $citizenFee = $this->citizenFeeService->findById($data['citizen_fee_id'], fn($q) => $q->select('id'));

        if (!$citizenFee) {
            throw new NotFoundHttpException('Data iuran warga tidak ditemukan');
        }

        DB::beginTransaction();
        try {
            $citizenFeeDetail = $this->repository->create($data);

            if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
                foreach ($data['files'] as $file) {
                    if ($file->isValid()) {
                        $citizenFeeDetail->addMedia($file)->toMediaCollection();
                    }
                }
            }

            $this->citizenFeeService->refreshJournal($citizenFee);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $citizenFeeDetail;
    }

    public function customDelete(CitizenFee|int $citizenFee, int $userId): bool
    {
        if (!$citizenFee instanceof CitizenFee) {
            $citizenFee = $this->citizenFeeService->findById($citizenFee, fn($q) => $q->select('id'));
            if (!$citizenFee) {
                throw new NotFoundHttpException('Data iuran warga tidak ditemukan');
            }
        }

        $citizenFeeDetail = CitizenFeeDetail::where('citizen_fee_id', $citizenFee->id)->where('user_id', $userId)->firstOrFail();

        DB::beginTransaction();
        try {
            $citizenFeeDetail->clearMediaCollection();
            $citizenFeeDetail->delete();
            $this->citizenFeeService->refreshJournal($citizenFee);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }
}
