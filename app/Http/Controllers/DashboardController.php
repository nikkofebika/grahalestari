<?php

namespace App\Http\Controllers;

use App\Http\Services\Dashboard\DashboardService;
use App\Models\Announcement;
use App\Models\CoaBalance;
use App\Models\Complaint;
use App\Models\UserDetail;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $service) {}

    public function index()
    {
        $totalUsers = UserDetail::count();

        // GENDER
        $genders = UserDetail::select('gender')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('gender')
            ->get();

        $genderChart = $genders->map(function ($row) use ($totalUsers) {
            return [
                'label' => $row->gender->label(),
                'value' => $row->total,
                'percentage' => round(($row->total / $totalUsers) * 100),
                'color' => $row->gender->color(),
            ];
        });

        // EDUCATION
        $educations = UserDetail::select('education')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('education')
            ->get();

        $educationChart = $educations->map(function ($row) use ($totalUsers) {
            return [
                'label' => $row->education->value,
                'value' => $row->total,
                'percentage' => round(($row->total / $totalUsers) * 100),
                'color' => $row->education->color(),
            ];
        });

        // RELIGION
        $religions = UserDetail::select('religion')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('religion')
            ->get();

        $religionChart = $religions->map(function ($row) use ($totalUsers) {
            return [
                'label' => $row->religion->value,
                'value' => $row->total,
                'percentage' => round(($row->total / $totalUsers) * 100),
                'color' => $row->religion->color(),
            ];
        });

        // MARITAL STATUS
        $maritalStatuses = UserDetail::select('marital_status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('marital_status')
            ->get();

        $maritalStatusChart = $maritalStatuses->map(function ($row) use ($totalUsers) {
            return [
                'label' => $row->marital_status->value,
                'value' => $row->total,
                'percentage' => round(($row->total / $totalUsers) * 100),
                'color' => $row->marital_status->color(),
            ];
        });

        $announcements = Announcement::limit(5)
            ->with('user', fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()))
            ->orderBy('created_at', 'desc')
            ->get();

        $complaints = Complaint::limit(5)
            ->with('user', fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()))
            ->orderBy('created_at', 'desc')
            ->get();


        // FINANCE REPORT
        $coaBalances = CoaBalance::tenanted()->get();
        $latestCoaBalance = $coaBalances->last();
        $trends = $coaBalances->map(function ($row) {
            return [
                'month' => date('M', strtotime("$row->period_year-$row->period_month-01")),
                'income' => ($row->debit),
                'expense' => ($row->credit),
            ];
        })->toArray();

        $totalIncome = $coaBalances->sum('debit');
        $totalExpense = $coaBalances->sum('credit');
        $profit = $totalIncome - $totalExpense;

        $dataFinance = [
            'total_income' => rupiah($totalIncome),
            'total_expense' => rupiah($totalExpense),
            'profit' => rupiah($profit),
            'profit_percentage' => round($profit / $totalIncome * 100, 1) . '%',
            'expense_percentage' => round($totalExpense / $totalIncome * 100, 1) . '%',
            'this_month' => [
                'income' => rupiah($latestCoaBalance->debit),
                'expense' => rupiah($latestCoaBalance->credit),
                'diff' => rupiah($latestCoaBalance->debit - $latestCoaBalance->credit),
            ],
            'trends' => $trends
        ];

        return Inertia::render('dashboard/index', [
            'totalUsers' => $totalUsers,
            'genderChart' => $genderChart,
            'educationChart' => $educationChart,
            'religionChart' => $religionChart,
            'maritalStatusChart' => $maritalStatusChart,
            'announcements' => $announcements,
            'complaints' => $complaints,
            'finance' => $dataFinance,
            // 'byGender' => Inertia::defer(fn() => $this->service->byGender(), 'demografi'),
            // 'byEducation' => Inertia::defer(fn() => $this->service->byEducation(), 'demografi'),
            // 'byReligion' => Inertia::defer(fn() => $this->service->byReligion(), 'demografi'),
            // 'byMaritalStatus' => Inertia::defer(fn() => $this->service->byMaritalStatus(), 'demografi'),
        ]);
    }
}
