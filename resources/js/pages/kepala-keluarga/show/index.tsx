import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import FamilyMembers from '@/pages/users/components/family-members';
import { type BreadcrumbItem } from '@/types';
import { TUser } from '@/types/user';

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
            <CreateUpdatePageHeading title="Anggota Keluarga" backUrl="/kepala-keluarga" />
            <DetailCard>
                <FamilyMembers user={data} familyMembers={family_members} showDetailButton={true} showDeleteButton={true} />
            </DetailCard>
        </AppLayout>
    );
}
