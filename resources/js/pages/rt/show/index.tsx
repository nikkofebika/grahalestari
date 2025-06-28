import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import LocationInfoShow from '@/pages/rw/components/location-info-show';
import { type BreadcrumbItem } from '@/types';
import { TTenant } from '@/types/tenant';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RT',
        href: '/rt',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TTenant;
};

export default function RtShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail RT" backUrl="/rt" />
            <DetailCard data={data}>
                <Table>
                    <TableRow>
                        <TableCell className="font-bold">RW</TableCell>
                        <TableCell>{data.parent?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Ketua RW</TableCell>
                        <TableCell>{data.parent?.leader?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Ketua RT</TableCell>
                        <TableCell>{data.leader?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Nama</TableCell>
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <LocationInfoShow data={data.parent} />
                    <TableRow>
                        <TableCell className="font-bold">Lokasi</TableCell>
                        <TableCell>
                            <a href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`} target="_blank">
                                Lihat Lokasi
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Pada</TableCell>
                        <TableCell>
                            {data.created_at} {data.created_by ? 'oleh ' + data.created_by.name : ''}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Diupdate Pada</TableCell>
                        <TableCell>
                            {data.updated_at} {data.updated_by ? 'oleh ' + data.updated_by.name : ''}
                        </TableCell>
                    </TableRow>
                    {data.deleted_at && (
                        <TableRow>
                            <TableCell className="font-bold">Dihapus Pada</TableCell>
                            <TableCell>
                                {data.deleted_at} {data.deleted_by ? 'oleh ' + data.deleted_by.name : ''}
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </DetailCard>
        </AppLayout>
    );
}
