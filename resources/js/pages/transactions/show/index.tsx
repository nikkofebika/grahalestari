import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import NormalBalanceBadge from '@/components/normal-balance-badge';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TJournal } from '@/types/journal';
import { Link } from '@inertiajs/react';
import { InfoIcon, LinkIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi',
        href: '/transactions',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TJournal;
};

export default function TransactionShow({ data }: Props) {
    const media = data?.media?.length ? data.media : data.model?.media?.length ? data.model.media : [];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Transaksi" backUrl="/transactions" />
            <DetailCard data={data}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">Group</TableCell>
                            <TableCell>{data.tenant?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Tanggal Transaksi</TableCell>
                            <TableCell>{data.transaction_date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Jenis</TableCell>
                            <TableCell>
                                {data.normal_balance === 'credit' ? (
                                    <>
                                        Pemasukan <NormalBalanceBadge normalBalance="credit" />
                                    </>
                                ) : (
                                    <>
                                        Pengeluaran <NormalBalanceBadge normalBalance="debit" />
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                        {data.normal_balance == 'credit' ? (
                            <>
                                <TableRow>
                                    <TableCell className="font-bold">
                                        Pemasukan Dari <NormalBalanceBadge normalBalance="credit" />
                                    </TableCell>
                                    <TableCell>{data.details[0].coa?.account_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">
                                        Masuk Ke <NormalBalanceBadge normalBalance="debit" />
                                    </TableCell>
                                    <TableCell>{data.details[1].coa?.account_name}</TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <>
                                <TableRow>
                                    <TableCell className="font-bold">
                                        Pengeluaran Untuk <NormalBalanceBadge normalBalance="debit" />
                                    </TableCell>
                                    <TableCell>{data.details[0].coa?.account_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">
                                        Pengeluaran Dari <NormalBalanceBadge normalBalance="credit" />
                                    </TableCell>
                                    <TableCell>{data.details[1].coa?.account_name}</TableCell>
                                </TableRow>
                            </>
                        )}
                        <TableRow>
                            <TableCell className="font-bold">Total</TableCell>
                            <TableCell>{data.amount_formatted}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Keterangan</TableCell>
                            <TableCell>{data.description}</TableCell>
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
                        {(data.model_id && data.model_type) && (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Alert>
                                        <AlertTitle>Transaksi ini berasal dari {data.model_type_formatted} <Link href={data.model_type_route!} className={buttonVariants({ size: 'sm' })}>Lihat Detail <LinkIcon /></Link></AlertTitle>
                                    </Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div>
                    <h2 className="mb-3 font-bold">Bukti Transaksi</h2>
                    <div className="flex flex-wrap gap-4">
                        {
                            media.length ? (
                                media.map((media) => {
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
                                    <AlertDescription>Tidak ada bukti transaksi yang diupload</AlertDescription>
                                </Alert>
                            )
                        }
                    </div>
                </div>
            </DetailCard>
        </AppLayout>
    );
}
