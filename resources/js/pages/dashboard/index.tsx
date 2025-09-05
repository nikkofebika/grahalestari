import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Deferred, Head } from '@inertiajs/react';
import ByEducation from './chart/demografi/by-education';
import ByGender from './chart/demografi/by-gender';
import ByMaritalStatus from './chart/demografi/by-marital-status';
import ByReligion from './chart/demografi/by-religion';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Demografi Warga</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
