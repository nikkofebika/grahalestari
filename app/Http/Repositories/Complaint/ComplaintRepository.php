<?php

namespace App\Http\Repositories\Complaint;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Complaint\ComplaintRepositoryInterface;
use App\Models\Complaint;

class ComplaintRepository extends BaseRepository implements ComplaintRepositoryInterface
{
    public function __construct(Complaint $model)
    {
        parent::__construct($model);
    }
}
