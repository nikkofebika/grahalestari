import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartAreaInteractive } from './chart-area-interactive';
import { SectionCards } from './section-cards';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const data = [
    {
        id: 1,
        header: 'Cover page',
        type: 'Cover page',
        status: 'In Process',
        target: '18',
        limit: '5',
        reviewer: 'Eddie Lake',
    },
    {
        id: 2,
        header: 'Table of contents',
        type: 'Table of contents',
        status: 'Done',
        target: '29',
        limit: '24',
        reviewer: 'Eddie Lake',
    },
    {
        id: 3,
        header: 'Executive summary',
        type: 'Narrative',
        status: 'Done',
        target: '10',
        limit: '13',
        reviewer: 'Eddie Lake',
    },
    {
        id: 4,
        header: 'Technical approach',
        type: 'Narrative',
        status: 'Done',
        target: '27',
        limit: '23',
        reviewer: 'Jamik Tashpulatov',
    },
    {
        id: 5,
        header: 'Design',
        type: 'Narrative',
        status: 'In Process',
        target: '2',
        limit: '16',
        reviewer: 'Jamik Tashpulatov',
    },
    {
        id: 6,
        header: 'Capabilities',
        type: 'Narrative',
        status: 'In Process',
        target: '20',
        limit: '8',
        reviewer: 'Jamik Tashpulatov',
    },
    {
        id: 7,
        header: 'Integration with existing systems',
        type: 'Narrative',
        status: 'In Process',
        target: '19',
        limit: '21',
        reviewer: 'Jamik Tashpulatov',
    },
    {
        id: 8,
        header: 'Innovation and Advantages',
        type: 'Narrative',
        status: 'Done',
        target: '25',
        limit: '26',
        reviewer: 'Assign reviewer',
    },
    {
        id: 9,
        header: "Overview of EMR's Innovative Solutions",
        type: 'Technical content',
        status: 'Done',
        target: '7',
        limit: '23',
        reviewer: 'Assign reviewer',
    },
    {
        id: 10,
        header: 'Advanced Algorithms and Machine Learning',
        type: 'Narrative',
        status: 'Done',
        target: '30',
        limit: '28',
        reviewer: 'Assign reviewer',
    },
    {
        id: 11,
        header: 'Adaptive Communication Protocols',
        type: 'Narrative',
        status: 'Done',
        target: '9',
        limit: '31',
        reviewer: 'Assign reviewer',
    },
    {
        id: 12,
        header: 'Advantages Over Current Technologies',
        type: 'Narrative',
        status: 'Done',
        target: '12',
        limit: '0',
        reviewer: 'Assign reviewer',
    },
    {
        id: 13,
        header: 'Past Performance',
        type: 'Narrative',
        status: 'Done',
        target: '22',
        limit: '33',
        reviewer: 'Assign reviewer',
    },
    {
        id: 14,
        header: 'Customer Feedback and Satisfaction Levels',
        type: 'Narrative',
        status: 'Done',
        target: '15',
        limit: '34',
        reviewer: 'Assign reviewer',
    },
    {
        id: 15,
        header: 'Implementation Challenges and Solutions',
        type: 'Narrative',
        status: 'Done',
        target: '3',
        limit: '35',
        reviewer: 'Assign reviewer',
    },
    {
        id: 16,
        header: 'Security Measures and Data Protection Policies',
        type: 'Narrative',
        status: 'In Process',
        target: '6',
        limit: '36',
        reviewer: 'Assign reviewer',
    },
    {
        id: 17,
        header: 'Scalability and Future Proofing',
        type: 'Narrative',
        status: 'Done',
        target: '4',
        limit: '37',
        reviewer: 'Assign reviewer',
    },
    {
        id: 18,
        header: 'Cost-Benefit Analysis',
        type: 'Plain language',
        status: 'Done',
        target: '14',
        limit: '38',
        reviewer: 'Assign reviewer',
    },
    {
        id: 19,
        header: 'User Training and Onboarding Experience',
        type: 'Narrative',
        status: 'Done',
        target: '17',
        limit: '39',
        reviewer: 'Assign reviewer',
    },
    {
        id: 20,
        header: 'Future Development Roadmap',
        type: 'Narrative',
        status: 'Done',
        target: '11',
        limit: '40',
        reviewer: 'Assign reviewer',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards />
                        <div className="px-4 lg:px-6">
                            <ChartAreaInteractive />
                        </div>
                        {/* <UserDataTable data={data} /> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
