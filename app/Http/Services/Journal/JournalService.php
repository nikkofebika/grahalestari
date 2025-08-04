<?php

namespace App\Http\Services\Journal;

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

            // if ($type == 'pemasukan') {
            //     $journal->details()->createMany([
            //         [
            //             'coa_id' => $data['debit_account_id'],
            //             'debit' => $data['amount'],
            //         ],
            //         [
            //             'coa_id' => $data['credit_account_id'],
            //             'credit' => $data['amount'],
            //         ]
            //     ]);
            // } else {
            //     $journal->details()->createMany([
            //         [
            //             'coa_id' => $data['debit_account_id'],
            //             'debit' => $data['amount'],
            //         ],
            //         [
            //             'coa_id' => $data['credit_account_id'],
            //             'credit' => $data['amount'],
            //         ]
            //     ]);
            // }

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
            // $journal->details;
            // dump($journal->toArray());
            // dump($data);
            // dump($journal->details[0]->coa_id);
            // dump($data['debit_account_id']);
            // dump($journal->details[0]->coa_id == $data['debit_account_id']);


            // dump($journal->details[1]->coa_id);
            // dump($journal->details[1]->coa_id == $data['credit_account_id']);

            // dd($journal->details[0]->coa_id == $data['debit_account_id'] || $journal->details[1]->coa_id == $data['credit_account_id']);
            if ($journal->details[0]->coa_id != $data['debit_account_id'] || $journal->details[1]->coa_id != $data['credit_account_id']) {
                $journal->details()->delete();
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
