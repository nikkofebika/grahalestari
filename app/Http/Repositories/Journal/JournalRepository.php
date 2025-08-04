<?php

namespace App\Http\Repositories\Journal;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Journal\JournalRepositoryInterface;
use App\Models\Journal;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class JournalRepository extends BaseRepository implements JournalRepositoryInterface
{
    public function __construct(Journal $model)
    {
        parent::__construct($model);
    }


    public function forceDelete(int $id): bool
    {
        $model = $this->findById($id, fn($q) => $q->withTrashed());
        if (!$model) {
            throw new NotFoundHttpException('Journal not found');
        }

        DB::beginTransaction();
        try {
            $model->details()->delete();
            $model->forceDelete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }
}
