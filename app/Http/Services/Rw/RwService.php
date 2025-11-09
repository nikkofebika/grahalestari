<?php

namespace App\Http\Services\Rw;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Rw\RwRepositoryInterface;
use App\Interfaces\Services\Rw\RwServiceInterface;
use App\Models\Rt;
use Illuminate\Support\Facades\DB;

class RwService extends BaseService implements RwServiceInterface
{
    public function __construct(protected RwRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function update(int $id, array $data): bool
    {
        $rw = $this->baseRepository->findById($id);

        DB::transaction(function () use ($rw, $data) {
            $this->baseRepository->update($rw->id, $data);

            Rt::where('parent_id', $rw->id)->update([
                'name' => $data['name']
            ]);
        });

        return true;
    }
}
