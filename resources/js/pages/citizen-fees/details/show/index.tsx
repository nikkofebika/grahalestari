import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFee } from '@/types/citizen-fee';
import { TUser } from '@/types/user';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
    {
        title: 'List Pembayaran',
        href: '',
    },
];

type Props = {
    user: TUser;
    citizen_fee: TCitizenFee;
};

export default function CitizenFeeDetailShow({ user, citizen_fee }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Iuran Warga" backUrl={`/iuran-warga/${citizen_fee.id}/details`} />
            <DetailCard>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">Group</TableCell>
                            <TableCell>{user.tenant?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Kategori Iuran Warga</TableCell>
                            <TableCell>{citizen_fee.category?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Nama Iuran Warga</TableCell>
                            <TableCell>{citizen_fee.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Nama Warga</TableCell>
                            <TableCell>{user.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Tanggal Pembayaran</TableCell>
                            <TableCell>{user.citizen_fee_detail?.date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Total Pembayaran</TableCell>
                            <TableCell>{user.citizen_fee_detail?.amount_formatted}</TableCell>
                        </TableRow>
                        {user.citizen_fee_detail && (
                            <>
                                <TableRow>
                                    <TableCell className="font-bold">Dibuat Pada</TableCell>
                                    <TableCell>
                                        {user.citizen_fee_detail.created_at} {user.citizen_fee_detail.created_by ? 'oleh ' + user.citizen_fee_detail.created_by.name : ''}
                                    </TableCell>
                                </TableRow>
                                {user.citizen_fee_detail.updated_by && (
                                    <TableRow>
                                        <TableCell className="font-bold">Diupdate Pada</TableCell>
                                        <TableCell>
                                            {user.citizen_fee_detail.updated_at} {user.citizen_fee_detail.updated_by ? 'oleh ' + user.citizen_fee_detail.updated_by.name : ''}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {user.citizen_fee_detail.deleted_at && (
                                    <TableRow>
                                        <TableCell className="font-bold">Dihapus Pada</TableCell>
                                        <TableCell>
                                            {user.citizen_fee_detail.deleted_at} {user.citizen_fee_detail.deleted_by ? 'oleh ' + user.citizen_fee_detail.deleted_by.name : ''}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
                {/* <div>
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
                </div> */}
            </DetailCard>
        </AppLayout>
    );
}
