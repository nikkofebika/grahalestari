<?php

namespace App\Http\Services\CitizenFee;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeCategoryRepositoryInterface;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeRepositoryInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Models\CitizenFee;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CitizenFeeService extends BaseService implements CitizenFeeServiceInterface
{
    public function __construct(
        protected CitizenFeeRepositoryInterface $repository,
        protected CitizenFeeCategoryRepositoryInterface $citizenFeeCategoryRepository,
        protected JournalServiceInterface $journalService,
    ) {
        parent::__construct($repository);
    }

    public function create(array $data): CitizenFee
    {
        $citizenFeeCategory = $this->citizenFeeCategoryRepository->findById($data['citizen_fee_category_id']);

        if (!$citizenFeeCategory) {
            throw new NotFoundHttpException('Kategori iuran warga tidak ditemukan');
        }

        DB::beginTransaction();
        try {
            $citizenFee = $this->repository->create($data);

            if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
                foreach ($data['files'] as $file) {
                    if ($file->isValid()) {
                        $citizenFee->addMedia($file)->toMediaCollection();
                    }
                }
            }

            // $this->journalService->createJournal([
            //     'model_id' => $citizenFee->id,
            //     'model_type' => CitizenFee::class,
            //     'tenant_id' => $citizenFeeCategory->tenant_id,
            //     'normal_balance' => NormalBalance::CREDIT,
            //     'transaction_date' => $citizenFee->date,
            //     'amount' => $citizenFee->amount,
            //     'description' => $citizenFee->name,
            //     'debit_account_id' => $citizenFeeCategory->debit_coa_id,
            //     'credit_account_id' => $citizenFeeCategory->credit_coa_id,
            // ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $citizenFee;
    }
}
