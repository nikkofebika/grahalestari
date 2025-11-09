<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    protected string $searchKey = 'name';

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i');
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'name', ...$additionalColumns);
    }

    public function scopeSearch(Builder $query, string $search): void
    {
        $query->where($this->searchKey, 'like', "%{$search}%");
    }

    public function scopeActive(Builder $query)
    {
        $query->where('is_active', true);
    }

    public function scopeWhereStatus(Builder $query, $value)
    {
        $query->where('status', $value);
    }

    public function scopeWhereLike(Builder $query, $column, $value)
    {
        $query->where($column, 'LIKE', '%' . $value . '%');
    }

    public function scopeOrWhereLike(Builder $query, $column, $value)
    {
        $query->orWhere($column, 'LIKE', '%' . $value . '%');
    }

    public function scopeCreatedAtStart(Builder $query, $date)
    {
        $query->whereDate('created_at', '>=', date('Y-m-d', strtotime($date)));
    }

    public function scopeCreatedAtEnd(Builder $query, $date)
    {
        $query->whereDate('created_at', '<=', date('Y-m-d', strtotime($date)));
    }
}
