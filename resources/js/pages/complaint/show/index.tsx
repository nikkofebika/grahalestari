import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import { nullToStrip } from '@/helpers/helper';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TComplaint } from '@/types/complaint';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TComplaint;
};

export default function ComplaintShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Aduan Masyarakat" backUrl="/aduan-masyarakat" />
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
                        <TableCell className="font-bold">Status</TableCell>
                        <TableCell>{data.status}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Lokasi</TableCell>
                        <TableCell>{data.location}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dilaporkan Pada</TableCell>
                        <TableCell>
                            {data.created_at} oleh {data.user?.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Ditangani Pada</TableCell>
                        <TableCell>
                            {data.handled_at && (
                                <span>
                                    {data.handled_at} oleh {nullToStrip(data.handled_by?.name)}
                                </span>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Selesai Pada</TableCell>
                        <TableCell>
                            {data.done_at && (
                                <span>
                                    {data.done_at} oleh {nullToStrip(data.done_by?.name)}
                                </span>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Tanggapan pelapor</TableCell>
                        <TableCell>{data.feedback}</TableCell>
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
