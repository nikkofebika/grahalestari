<?php

namespace App\Http\Services\Complaint;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Complaint\ComplaintRepositoryInterface;
use App\Interfaces\Services\Complaint\ComplaintServiceInterface;

class ComplaintService extends BaseService implements ComplaintServiceInterface
{
    public function __construct(protected ComplaintRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
