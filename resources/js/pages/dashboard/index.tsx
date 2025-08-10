import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Deferred, Head } from '@inertiajs/react';
import ByGender from './chart/demografi/by-gender';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Demografi Warga</CardTitle>
                </CardHeader>
                <CardContent className="flex pb-0">
                    <Deferred data="byGender" fallback={<div>Loading chart...</div>}>
                        <ByGender />
                    </Deferred>

                    <Deferred data="byGender" fallback={<div>Loading chart...</div>}>
                        <ByGender />
                    </Deferred>

                    <Deferred data="byGender" fallback={<div>Loading chart...</div>}>
                        <ByGender />
                    </Deferred>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
