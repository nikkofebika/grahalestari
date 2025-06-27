import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TAnnouncement } from '@/types/announcement';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: '/pengumuman',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TAnnouncement;
};

export default function AnnouncementShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Pengumuman" backUrl="/pengumuman" />
            <DetailCard data={data}>
                <Table>
                    <TableRow>
                        <TableCell className="font-bold">Judul</TableCell>
                        <TableCell>{data.title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Kategori</TableCell>
                        <TableCell>{data.category}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Target Penerima</TableCell>
                        <TableCell>{data.target_scope}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Waktu Mulai</TableCell>
                        <TableCell>{data.start_at}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Waktu Mulai</TableCell>
                        <TableCell>{data.end_at}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Deskripsi</TableCell>
                        <TableCell>{data.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Pada</TableCell>
                        <TableCell>
                            {data.created_at} {data.created_by ? 'oleh ' + data.created_by.name : ''}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Oleh</TableCell>
                        <TableCell>{data.user?.name}</TableCell>
                    </TableRow>
                    {data.updated_by && (
                        <TableRow>
                            <TableCell className="font-bold">Diupdate Pada</TableCell>
                            <TableCell>
                                {data.updated_at} {data.updated_by ? 'oleh ' + data.updated_by.name : ''}
                            </TableCell>
                        </TableRow>
                    )}
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
