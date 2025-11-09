<?php

namespace App\Exports\User;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersGroupByKK implements FromView, ShouldAutoSize
{
    use Exportable;

    public function __construct(private ?string $userId = null) {}

    public function view(): View
    {
        $userColumns = ['users.id', 'users.parent_id', 'users.group_id', 'users.tenant_id', 'users.name', 'users.email'];
        $users = User::select($userColumns)
            ->whereNotGod()
            ->when($this->userId, fn($q) => $q->where('users.id', $this->userId))
            ->with([
                'detail',
                'tenant' => fn($q) => $q->selectMinimalist(),
                'childs' => fn($q) => $q
                    ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
                    ->with('detail')
                    ->orderByDesc('user_details.birth_date')
                    ->select($userColumns)
            ])
            ->get();

        return view('exports.excel.users.users-group-by-kk', [
            'users' => $users
        ]);
    }
}
