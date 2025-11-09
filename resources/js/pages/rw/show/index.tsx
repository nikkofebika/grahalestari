import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TTenant } from '@/types/tenant';
import LocationInfoShow from '../components/location-info-show';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RW',
        href: '/rw',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TTenant;
};

export default function RwShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail RW" backUrl="/rw" />
            <DetailCard data={data}>
                <Table>
                    <TableRow>
                        <TableCell className="font-bold">Ketua RW</TableCell>
                        <TableCell>{data.leader?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Nama</TableCell>
                        <TableCell>{data.full_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Nomor RT</TableCell>
                        <TableCell>{data.number}</TableCell>
                    </TableRow>
                    <LocationInfoShow data={data} />
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
                    <TableRow>
                        <TableCell className="font-bold">Lokasi</TableCell>
                        <TableCell>
                            <iframe
                                src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`}
                                width="100%"
                                height="400"
                                allowFullScreen
                                loading="lazy"
                                className="rounded-xl border-0"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </TableCell>
                    </TableRow>
                </Table>
            </DetailCard>
        </AppLayout>
    );
}
