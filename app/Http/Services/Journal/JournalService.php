<?php

namespace App\Http\Services\Journal;

use App\Enums\NormalBalance;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Journal\JournalRepositoryInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Models\Journal;
use Illuminate\Support\Facades\DB;

class JournalService extends BaseService implements JournalServiceInterface
{
    public function __construct(protected JournalRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    protected function createJournalDetails(Journal $journal, array $data)
    {
        // credit is pemasukan
        if ($journal->normal_balance->is(NormalBalance::CREDIT->value)) {
            $journal->details()->createMany([
                [
                    'coa_id' => $data['credit_account_id'],
                    'credit' => $data['amount'],
                ],
                [
                    'coa_id' => $data['debit_account_id'],
                    'debit' => $data['amount'],
                ]
            ]);
        } else {
            $journal->details()->createMany([
                [
                    'coa_id' => $data['debit_account_id'],
                    'debit' => $data['amount'],
                ],
                [
                    'coa_id' => $data['credit_account_id'],
                    'credit' => $data['amount'],
                ]
            ]);
        }
    }

    public function createJournal(string $type, array $data): Journal
    {
        DB::beginTransaction();
        try {
            $journal = $this->baseRepository->create($data);

            if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
                foreach ($data['files'] as $file) {
                    if ($file->isValid()) {
                        $journal->addMedia($file)->toMediaCollection();
                    }
                }
            }

            $this->createJournalDetails($journal, $data);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $journal;
    }

    public function update(int $id, array $data): bool
    {
        $journal = $this->findById($id, load: ['details']);

        $debitAccountId = $journal->details[1]->coa_id;
        $creditAccountId = $journal->details[0]->coa_id;
        if ($journal->normal_balance->is(NormalBalance::DEBIT)) {
            $debitAccountId = $journal->details[0]->coa_id;
            $creditAccountId = $journal->details[1]->coa_id;
        }

        DB::beginTransaction();
        try {
            $journal->update($data);

            if (isset($data['removed_file_ids']) && is_array($data['removed_file_ids']) && count($data['removed_file_ids'])) {
                $journal->media()->whereIn('id', $data['removed_file_ids'])->delete();
            }

            if (isset($data['files']) && is_array($data['files']) && count($data['files'])) {
                foreach ($data['files'] as $file) {
                    if ($file->isValid()) {
                        $journal->addMedia($file)->toMediaCollection();
                    }
                }
            }

            if ($debitAccountId != $data['debit_account_id'] || $creditAccountId != $data['credit_account_id']) {
                $journal->details()->delete();
                $this->createJournalDetails($journal, $data);
            } else {
                $journal->details()->where('debit', '>', 0)->update([
                    'debit' => $data['amount'],
                ]);
                $journal->details()->where('credit', '>', 0)->update([
                    'credit' => $data['amount'],
                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }
}
