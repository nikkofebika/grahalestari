<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalDetail extends BaseModel
{
    protected $fillable = [
        'journal_id',
        'coa_id',
        'debit',
        'credit',
    ];

    protected function debit(): Attribute
    {
        return Attribute::make(
            get: fn(int $value) => number_format($value, 0, ',', '.'),
        );
    }

    protected function credit(): Attribute
    {
        return Attribute::make(
            get: fn(int $value) => number_format($value, 0, ',', '.'),
        );
    }

    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }

    public function coa(): BelongsTo
    {
        return $this->belongsTo(Coa::class);
    }
}
