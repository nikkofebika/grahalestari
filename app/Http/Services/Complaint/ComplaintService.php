<?php

namespace App\Http\Services\Complaint;

use App\Enums\ComplaintStatus;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Complaint\ComplaintRepositoryInterface;
use App\Interfaces\Services\Complaint\ComplaintServiceInterface;
use App\Models\Complaint;

class ComplaintService extends BaseService implements ComplaintServiceInterface
{
    public function __construct(protected ComplaintRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function handle(Complaint $complaint, array $data): bool
    {
        if ($data['status'] === ComplaintStatus::IN_PROGRESS->value) {
            $data = [
                'status' => ComplaintStatus::IN_PROGRESS,
                'handled_at' => $data['handled_at'],
                'handled_by_id' => auth()->id(),
                'handled_feedback' => $data['handled_feedback'],
            ];
        } else {
            $data = [
                'status' => ComplaintStatus::DONE,
                'done_at' => now(),
                'done_by_id' => auth()->id(),
                'done_feedback' => $data['handled_feedback'],
            ];
        }

        return $complaint->update($data);

        // return true;
    }
}
