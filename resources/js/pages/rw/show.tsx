import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TGroup } from '@/types/group';

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
    data: TGroup;
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
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Provinsi</TableCell>
                        <TableCell>{data.province_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Kota/Kabupaten</TableCell>
                        <TableCell>{data.city_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Kecamatan</TableCell>
                        <TableCell>{data.district_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Kelurahan</TableCell>
                        <TableCell>{data.village_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Alamat</TableCell>
                        <TableCell>{data.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Lokasi</TableCell>
                        <TableCell>
                            <a href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`} target="_blank">
                                Lihat Lokasi
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Kode POS</TableCell>
                        <TableCell>{data.postal_code}</TableCell>
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
