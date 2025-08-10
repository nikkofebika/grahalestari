<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalDetail extends BaseModel
{
    protected $fillable = [
        'journal_id',
        'coa_id',
        'debit',
        'credit',
    ];

    protected $appends = [
        'debit_formatted',
        'credit_formatted',
    ];

    public function getDebitFormattedAttribute(): string
    {
        return formatNumber($this->debit);
    }

    public function getCreditFormattedAttribute(): string
    {
        return formatNumber($this->credit);
    }

    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }

    public function coa(): BelongsTo
    {
        return $this->belongsTo(Coa::class);
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'journal_id', 'coa_id', 'debit', 'credit', ...$additionalColumns);
    }
}
