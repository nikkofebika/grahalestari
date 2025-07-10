<?php

namespace App\Enums;

enum OpenApiTags: string
{
    case AUTH = 'Autentication';
    case USER = 'User';
    case RW = 'RW';
    case RT = 'RT';
    case TENANT = 'Tenant';
    case COMPLAINT = 'Complaint';
    case ANNOUNCEMENT = 'Announcement';

    public function getDescription(): string
    {
        return match ($this) {
            self::USER => "User Management",
            default => "API " . $this->value,
        };
    }

    public static function tags(): array
    {
        return collect(self::cases())->map(fn($tag) => ['name' => $tag->value, 'description' => $tag->getDescription()])->toArray();
    }
}
