<?php

namespace App\Interfaces\Services\Journal;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\Journal;

interface JournalServiceInterface extends BaseServiceInterface
{
    public function createJournal(array $data): Journal;
}
