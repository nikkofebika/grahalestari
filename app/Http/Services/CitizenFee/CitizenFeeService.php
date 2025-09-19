<?php

namespace App\Http\Services\CitizenFee;

use App\Enums\NormalBalance;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeCategoryRepositoryInterface;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeRepositoryInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Models\CitizenFee;
use App\Models\Journal;
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

            // if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
            //     foreach ($data['files'] as $file) {
            //         if ($file->isValid()) {
            //             $citizenFee->addMedia($file)->toMediaCollection();
            //         }
            //     }
            // }

            $this->journalService->createJournal([
                'model_id' => $citizenFee->id,
                'model_type' => CitizenFee::class,
                'tenant_id' => $citizenFee->category->tenant_id,
                'normal_balance' => NormalBalance::CREDIT,
                'transaction_date' => $citizenFee->effective_date,
                'amount' => 0,
                'description' => $citizenFee->name,
                'debit_account_id' => $citizenFee->category->debit_coa_id,
                'credit_account_id' => $citizenFee->category->credit_coa_id,
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $citizenFee;
    }

    public function update(int $id, array $data): bool
    {
        DB::beginTransaction();
        try {
            $this->baseRepository->update($id, $data);
            $this->refreshJournal($id);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }

    public function delete(int $id): bool
    {
        $citizenFee = $this->findById($id);

        if (!$citizenFee) {
            throw new NotFoundHttpException('Data iuran warga tidak ditemukan');
        }

        DB::beginTransaction();
        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            Journal::where('model_id', $citizenFee->id)->where('model_type', CitizenFee::class)->forceDelete();
            $citizenFee->clearMediaCollection();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            $this->baseRepository->delete($id);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }

    public function refreshJournal(CitizenFee|int $citizenFee): void
    {
        if (!$citizenFee instanceof CitizenFee) {
            $citizenFee = $this->findById($citizenFee);
        }

        $data['amount'] = $citizenFee->getTotalAmount();

        if ($citizenFee->effective_date) {
            $data['transaction_date'] = $citizenFee->effective_date;
        }
        if ($citizenFee->name) {
            $data['description'] = $citizenFee->name;
        }

        $citizenFee->journal()->update($data);
    }
}
