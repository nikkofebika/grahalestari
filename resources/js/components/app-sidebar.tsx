import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ContactRoundIcon, Folder, GroupIcon, LayoutGrid, MegaphoneIcon, UserPenIcon, Users } from 'lucide-react';
import AppLogo from './app-logo';

const masterData: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    // {
    //     title: 'Roles',
    //     href: '/roles',
    //     icon: PencilIcon,
    // },
    // {
    //     title: 'Groups',
    //     href: '/groups',
    //     icon: GroupIcon,
    // },
    {
        title: 'RW',
        href: '/rw',
        icon: GroupIcon,
        allowUserType: ['god', 'admin_rw'],
    },
    {
        title: 'RT',
        href: '/rt',
        icon: GroupIcon,
        allowUserType: ['god', 'admin_rw', 'admin_rt'],
    },
    {
        title: 'Kepala Keluarga',
        href: '/kepala-keluarga',
        icon: ContactRoundIcon,
        allowUserType: ['god', 'admin_rw', 'admin_rt'],
    },
];

const generalFeature: NavItem[] = [
    {
        title: 'Pengumuman',
        href: '/pengumuman',
        icon: MegaphoneIcon,
    },
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
        icon: UserPenIcon,
    },
];

const financeFeature: NavItem[] = [
    {
        title: 'COA',
        href: '/coas',
        icon: MegaphoneIcon,
    },
    {
        title: 'Transaksi',
        href: '/transactions',
        icon: MegaphoneIcon,
    },
    {
        title: 'Jurnal',
        href: '/journals',
        icon: MegaphoneIcon,
    },
    {
        title: 'Ledger',
        href: '/ledger',
        icon: MegaphoneIcon,
    },
    {
        title: 'Posisi Keuangan',
        href: '/tribal',
        icon: MegaphoneIcon,
    },
    {
        title: 'Laporan Keuangan',
        href: '/laporan-keuangan',
        icon: MegaphoneIcon,
    },
    // {
    //     title: 'Aduan Masyarakat',
    //     href: '/aduan-masyarakat',
    //     icon: UserPenIcon,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    console.log('usepage AppSidebar', auth);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Master Data" items={masterData} />
                <NavMain label="Umum" items={generalFeature} />
                <NavMain label="Keuangan" items={financeFeature} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
