<?php

namespace App\Http\Services\ProfitActivity;

use App\Enums\NormalBalance;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\ProfitActivity\ProfitActivityCategoryRepositoryInterface;
use App\Interfaces\Repositories\ProfitActivity\ProfitActivityRepositoryInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Interfaces\Services\ProfitActivity\ProfitActivityServiceInterface;
use App\Models\ProfitActivity;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfitActivityService extends BaseService implements ProfitActivityServiceInterface
{
    public function __construct(
        protected ProfitActivityRepositoryInterface $repository,
        protected ProfitActivityCategoryRepositoryInterface $profitActivityCategoryRepository,
        protected JournalServiceInterface $journalService,
    ) {
        parent::__construct($repository);
    }

    public function create(array $data): ProfitActivity
    {
        $profitActivityCategory = $this->profitActivityCategoryRepository->findById($data['profit_activity_category_id']);

        if (!$profitActivityCategory) {
            throw new NotFoundHttpException('Profit activity category not found');
        }

        DB::beginTransaction();
        try {
            $profitActivity = $this->repository->create($data);

            if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
                foreach ($data['files'] as $file) {
                    if ($file->isValid()) {
                        $profitActivity->addMedia($file)->toMediaCollection();
                    }
                }
            }

            $this->journalService->createJournal([
                'model_id' => $profitActivity->id,
                'model_type' => ProfitActivity::class,
                'tenant_id' => $profitActivityCategory->tenant_id,
                'normal_balance' => NormalBalance::CREDIT,
                'transaction_date' => $profitActivity->date,
                'amount' => $profitActivity->amount,
                'description' => $profitActivity->name,
                'debit_account_id' => $profitActivityCategory->debit_coa_id,
                'credit_account_id' => $profitActivityCategory->credit_coa_id,
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $profitActivity;
    }
}
