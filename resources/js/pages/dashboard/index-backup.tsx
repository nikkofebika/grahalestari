import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Deferred, Head } from '@inertiajs/react';
import { User } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ByEducation from './chart/demografi/by-education';
import ByGender from './chart/demografi/UserDemografiChart';
import ByMaritalStatus from './chart/demografi/by-marital-status';
import ByReligion from './chart/demografi/by-religion';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type Props = {
    genderChart: {
        label: string;
        value: number;
        percentage: number;
        color: string;
    }[]
}

export default function Dashboard({ genderChart }: Props) {
    const CustomTooltip = ({ active, payload }: { active: boolean; payload: any[] }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{data.label}</p>
                    <p className="text-sm text-muted-foreground">
                        {data.value} orang ({data.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Demografi Warga</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Jenis Kelamin
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-48">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <defs>
                                                        <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                        </linearGradient>
                                                        <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Pie
                                                        data={genderChart}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={30}
                                                        outerRadius={70}
                                                        paddingAngle={2}
                                                        dataKey="value"
                                                    >
                                                        {genderChart.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip content={<CustomTooltip />} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            {genderChart.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <span className="text-sm">{item.label}</span>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {item.value} ({item.percentage}%)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <Deferred data="byGender" fallback={<div>Loading chart...</div>}>
                                    <ByGender />
                                </Deferred>
                            </div>
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <Deferred data="byEducation" fallback={<div>Loading chart...</div>}>
                                    <ByEducation />
                                </Deferred>
                            </div>
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <Deferred data="byReligion" fallback={<div>Loading chart...</div>}>
                                    <ByReligion />
                                </Deferred>
                            </div>

                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video rounded-xl border">
                                <Deferred data="byMaritalStatus" fallback={<div>Loading chart...</div>}>
                                    <ByMaritalStatus />
                                </Deferred>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
