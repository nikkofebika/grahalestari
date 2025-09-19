import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFee } from '@/types/citizen-fee';
import { InfoIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TCitizenFee;
};

export default function CitizenFeeShow({ data }: Props) {
    console.log('data data', data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Iuran Warga" backUrl="/iuran-warga" />
            <DetailCard data={data}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">Group</TableCell>
                            <TableCell>{data.category?.tenant?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Tanggal Efektif</TableCell>
                            <TableCell>{data.effective_date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Jatuh Tempo</TableCell>
                            <TableCell>{data.due_date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Kategori Kegiatan</TableCell>
                            <TableCell>{data.category?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Nama Kegiatan</TableCell>
                            <TableCell>{data.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Total Pendapatan</TableCell>
                            <TableCell>{data.amount_formatted}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Dibuat Pada</TableCell>
                            <TableCell>
                                {data.created_at} {data.created_by ? 'oleh ' + data.created_by.name : ''}
                            </TableCell>
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
                    </TableBody>
                </Table>
                <div>
                    <h2 className="mb-3 font-bold">Dokumentasi Kegiatan</h2>
                    <div className="flex flex-wrap gap-4">
                        {
                            data.media?.length ? (
                                data.media.map((media) => {
                                    const isImage = media.mime_type.includes('image');

                                    return (
                                        <div key={media.id} className="flex flex-col items-center">
                                            {isImage ? (
                                                <a
                                                    href={media.original_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block overflow-hidden rounded-lg border shadow transition hover:shadow-lg"
                                                >
                                                    <img src={media.original_url} alt={media.name} className="h-48 w-48 bg-gray-50 object-contain" />
                                                </a>
                                            ) : (
                                                <div className="flex h-48 w-48 flex-col items-center justify-center rounded-lg border bg-gray-50 shadow">
                                                    <span className="truncate px-2 text-sm text-gray-600">{media.file_name}</span>
                                                    <a
                                                        href={media.original_url}
                                                        target="_blank"
                                                        download
                                                        className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <Alert>
                                    <InfoIcon />
                                    <AlertDescription>Tidak ada file yang diupload</AlertDescription>
                                </Alert>
                            )
                        }
                    </div>
                </div>
            </DetailCard>
        </AppLayout>
    );
}
