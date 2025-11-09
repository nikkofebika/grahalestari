import DetailCard from '@/components/detail-card';
import CustomPageHeading from '@/components/headings/custom-page-heading';
import { buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FamilyMembers from '@/pages/users/components/family-members';
import { type BreadcrumbItem } from '@/types';
import { TUser } from '@/types/user';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, DownloadIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kepala Keluarga',
        href: '/kepala-keluarga',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TUser;
    family_members: TUser[];
};

export default function KepalaKeluargaShow({ data, family_members }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CustomPageHeading title="Anggota Keluarga">
                <div className="space-x-2">
                    <a href={route('kepala-keluarga.export', data)} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <DownloadIcon /> Export Data
                    </a>
                    <Link href={route('kepala-keluarga.index')} className={buttonVariants({ size: 'sm' })}>
                        <ChevronLeftIcon /> Kembali
                    </Link>
                </div>
            </CustomPageHeading>
            <DetailCard>
                <FamilyMembers user={data} familyMembers={family_members} showDetailButton={true} showDeleteButton={true} />
            </DetailCard>
        </AppLayout>
    );
}
