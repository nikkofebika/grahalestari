import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TAnnouncement } from '@/types/announcement';
import { TComplaint } from '@/types/complaint';
import { TChart } from '@/types/global';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangleIcon, ArrowRightIcon, BarChart3Icon, BellIcon, ChurchIcon, CreditCardIcon, DollarSignIcon, FileTextIcon, GraduationCapIcon, Heart, TrendingUp, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import UserDemografiChart from './chart/demografi/user-demografi-chart';

export const description = "A multiple bar chart"

const chartData = [
    { month: "January", income: 186, expense: 80 },
    { month: "February", income: 305, expense: 200 },
    { month: "March", income: 237, expense: 120 },
    { month: "April", income: 73, expense: 190 },
    { month: "May", income: 209, expense: 130 },
    { month: "June", income: 214, expense: 140 },
]

const chartConfig = {
    income: {
        label: "Pendapatan",
        color: "var(--chart-2)",
    },
    expense: {
        label: "Pengeluaran",
        color: "red",
    },
} satisfies ChartConfig

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type TFinance = {
    total_income: string;
    total_expense: string;
    profit: string;
    profit_percentage: string;
    expense_percentage: string;
    this_month: {
        income: string;
        expense: string;
        diff: string;
    }
    trends: {
        month: string;
        income: string;
        expense: string;
    }[]
}

type Props = {
    totalUsers: number;
    genderChart: TChart[];
    educationChart: TChart[];
    religionChart: TChart[];
    maritalStatusChart: TChart[];
    announcements: TAnnouncement[];
    complaints: TComplaint[];
    finance: TFinance;
}

export default function Dashboard({ totalUsers, genderChart, educationChart, religionChart, maritalStatusChart, announcements, complaints, finance }: Props) {
    const stats = [
        { title: "Total Warga", value: totalUsers, change: "+12", icon: UsersIcon, color: "text-blue-600" },
        { title: "Saldo Kas", value: finance.profit, change: "+15%", icon: DollarSignIcon, color: "text-green-600" },
        { title: "Tagihan Aktif", value: "3", change: "Rp 25.5M", icon: CreditCardIcon, color: "text-orange-600" },
        { title: "Aduan Pending", value: "7", change: "Perlu tindakan", icon: AlertTriangleIcon, color: "text-red-600" },
    ];

    // Data laporan keuangan ringkas
    const laporanKeuanganRingkas = {
        totalPendapatan: 42000000,
        totalPengeluaran: 16500000,
        labaRugi: 25500000,
        persentaseLabaRugi: 60.7,
        bulanIni: {
            pendapatan: 7500000,
            pengeluaran: 4200000,
            selisih: 3300000
        },
        trendBulanan: [
            { bulan: "Okt", pendapatan: 6800000, pengeluaran: 4100000 },
            { bulan: "Nov", pendapatan: 7200000, pengeluaran: 3900000 },
            { bulan: "Des", pendapatan: 7800000, pengeluaran: 4500000 },
            { bulan: "Jan", pendapatan: 7500000, pengeluaran: 4200000 }
        ]
    };


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                <Badge variant="outline">
                                    {stat.change}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-2xl font-medium">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.title}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Demografi Warga</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <UserDemografiChart chart={genderChart} title={<><UsersIcon className="h-5 w-5" /> Jenis Kelamin</>} />
                            </div>

                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <UserDemografiChart chart={educationChart} title={<><GraduationCapIcon className="h-5 w-5" /> Pendidikan</>} />
                            </div>

                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <UserDemografiChart chart={religionChart} title={<><ChurchIcon className="h-5 w-5" /> Agama</>} />
                            </div>

                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <UserDemografiChart chart={maritalStatusChart} title={<><Heart className="h-5 w-5" /> Status Perkawinan</>} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-5">
                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BellIcon className="h-5 w-5" />
                                Pengumuman Terbaru
                            </CardTitle>
                            <Link href={route('pengumuman.index')}>
                                <Button variant="ghost">
                                    Lihat Semua <ArrowRightIcon />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium line-clamp-1">{announcement.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm text-muted-foreground">{announcement.user?.tenant?.name}</p>
                                        {/* <Badge className="text-xs">
                                            {announcement.prioritas}
                                        </Badge> */}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {announcement.start_at + ' - ' + announcement.end_at}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangleIcon className="h-5 w-5" />
                                Aduan Masyarakat
                            </CardTitle>
                            <Link href={route('aduan-masyarakat.index')}>
                                <Button variant="ghost">
                                    Lihat Semua <ArrowRightIcon />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {complaints.map((complaint) => (
                            <div key={complaint.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium line-clamp-1">{complaint.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm text-muted-foreground">Oleh {complaint.user?.name}</p>
                                        {/* <Badge className="text-xs">
                                            {complaint.prioritas}
                                        </Badge> */}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Status {complaint.status}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Kategori {complaint.category}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {complaint.created_at}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3Icon className="h-5 w-5" />
                                Laporan Keuangan {new Date().getFullYear()}
                            </CardTitle>
                            <Button variant="ghost" size="sm">
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        {/* <CardDescription>January - June 2024</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-medium text-green-600">
                                    {finance.total_income}
                                </p>
                                <p className="text-sm text-green-700">Total Pendapatan</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <p className="text-2xl font-medium text-red-600">
                                    {finance.total_expense}
                                </p>
                                <p className="text-sm text-red-700">Total Pengeluaran</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-medium text-blue-600">
                                    {finance.profit}
                                </p>
                                <p className="text-sm text-blue-700">Laba Bersih</p>
                                <p className="text-xs text-blue-600">
                                    ({finance.profit_percentage}% margin)
                                </p>
                            </div>
                        </div>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={finance.trends}>
                                <YAxis tickFormatter={(value) => `${(value / 1000000)} jt`} />

                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={true}
                                    tickMargin={10}
                                    axisLine={true}
                                // tickFormatter={(value) => value.slice(0, 3)}
                                />
                                {/* <ChartTooltip
                                    // label={true}
                                    labelFormatter={(label) => `Bulan ${label}`}
                                    content={<ChartTooltipContent />}
                                /> */}
                                <Tooltip
                                    formatter={(value, name) => [formatCurrency(value), name]}
                                    labelFormatter={(label) => `Bulan ${label}`}
                                />
                                <Legend />
                                <Bar dataKey="income" fill="var(--color-income)" radius={4} name="Pendapatan" />
                                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} name="Pengeluaran" />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground leading-none">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter> */}
                </Card>

                {/* Performance Bulan Ini */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUpIcon className="h-5 w-5" />
                            Performa Bulan Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Pendapatan Januari</span>
                                <span className="font-medium text-green-600">
                                    {finance.this_month.income}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Pengeluaran Januari</span>
                                <span className="font-medium text-red-600">
                                    {finance.this_month.expense}
                                </span>
                            </div>
                            <div className="pt-2 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Selisih</span>
                                    <span className="font-medium text-blue-600">
                                        {finance.this_month.diff}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium">Rasio Keuangan</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Margin Keuntungan</span>
                                    <span className="text-sm font-medium">
                                        {finance.profit_percentage}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Rasio Biaya</span>
                                    <span className="text-sm font-medium">
                                        {finance.expense_percentage}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Cash Position</span>
                                    <span className="text-sm font-medium text-green-600">Strong</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Button size="sm" variant="outline" className="w-full">
                                <FileTextIcon className="h-4 w-4 mr-2" />
                                Lihat Laporan Lengkap
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3Icon className="h-5 w-5" />
                                Laporan Keuangan
                            </CardTitle>
                            <Button variant="ghost" size="sm">
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-medium text-green-600">
                                    {formatCurrency(laporanKeuanganRingkas.totalPendapatan)}
                                </p>
                                <p className="text-sm text-green-700">Total Pendapatan</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <p className="text-2xl font-medium text-red-600">
                                    {formatCurrency(laporanKeuanganRingkas.totalPengeluaran)}
                                </p>
                                <p className="text-sm text-red-700">Total Pengeluaran</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-medium text-blue-600">
                                    {formatCurrency(laporanKeuanganRingkas.labaRugi)}
                                </p>
                                <p className="text-sm text-blue-700">Laba Bersih</p>
                                <p className="text-xs text-blue-600">
                                    ({laporanKeuanganRingkas.persentaseLabaRugi}% margin)
                                </p>
                            </div>
                        </div>

                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={laporanKeuanganRingkas.trendBulanan}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="bulan" />
                                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                    <Tooltip
                                        formatter={(value) => [formatCurrency(value), '']}
                                        labelFormatter={(label) => `Bulan ${label}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="pendapatan" fill="#22c55e" name="Pendapatan" />
                                    <Bar dataKey="pengeluaran" fill="#ef4444" name="Pengeluaran" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUpIcon className="h-5 w-5" />
                            Performa Bulan Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Pendapatan Januari</span>
                                <span className="font-medium text-green-600">
                                    {formatCurrency(laporanKeuanganRingkas.bulanIni.pendapatan)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Pengeluaran Januari</span>
                                <span className="font-medium text-red-600">
                                    {formatCurrency(laporanKeuanganRingkas.bulanIni.pengeluaran)}
                                </span>
                            </div>
                            <div className="pt-2 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Selisih</span>
                                    <span className="font-medium text-blue-600">
                                        {formatCurrency(laporanKeuanganRingkas.bulanIni.selisih)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium">Rasio Keuangan</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Profit Margin</span>
                                    <span className="text-sm font-medium">
                                        {laporanKeuanganRingkas.persentaseLabaRugi}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Expense Ratio</span>
                                    <span className="text-sm font-medium">
                                        {Math.round((laporanKeuanganRingkas.totalPengeluaran / laporanKeuanganRingkas.totalPendapatan) * 100)}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Cash Position</span>
                                    <span className="text-sm font-medium text-green-600">Strong</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Button size="sm" variant="outline" className="w-full">
                                <FileTextIcon className="h-4 w-4 mr-2" />
                                Lihat Laporan Lengkap
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div> */}
        </AppLayout>
    );
}
