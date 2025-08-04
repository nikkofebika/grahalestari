import CustomPageHeading from '@/components/headings/custom-page-heading';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDeleteRow from '@/hooks/use-delete-row';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TData, TPermissionActions } from '@/types/global';
import { TJournal } from '@/types/journal';
import { Link } from '@inertiajs/react';
import { EditIcon, EyeIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Fragment, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jurnal',
        href: '/journal',
    },
];

type Props = {
    datas: TData<TJournal>;
    total: number;
    permission_actions?: TPermissionActions;
    // filters: TJournalFilters;
    // page: number;
    // per_page: number;
};

export default function JournalIndex({ datas, total, permission_actions }: Props) {
    // const { search, setSearch } = useSearch({
    //     url: datas.meta.path,
    //     initialValue: filters.search,
    //     perPage: per_page,
    // });

    const [selectedData, setSelectedData] = useState<{
        id: number | undefined;
        name: string | undefined;
    }>({
        id: undefined,
        name: undefined,
    });

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'transactions.force-delete' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CustomPageHeading title="Jurnal">
                {(permission_actions?.create ?? true) && (
                    <div className="flex gap-2">
                        <Link href={route('transactions.create', 'credit')} className={buttonVariants({ size: 'sm', variant: 'primaryGreen' })}>
                            <PlusIcon /> Pemasukan
                        </Link>
                        <Link href={route('transactions.create', 'debit')} className={buttonVariants({ size: 'sm', variant: 'destructive' })}>
                            <PlusIcon /> Pengeluaran
                        </Link>
                    </div>
                )}
            </CustomPageHeading>

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Tgl Transaction</TableHead>
                            <TableHead>Keterangan</TableHead>
                            <TableHead>Dibuat Oleh</TableHead>
                            <TableHead>Akun</TableHead>
                            <TableHead>Debit</TableHead>
                            <TableHead>Kredit</TableHead>
                            <TableHead>Opsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas?.data.length ? (
                            datas.data.map((data) => (
                                <Fragment key={`fragment-${data.id}`}>
                                    <TableRow key={`table-row-${data.id}`}>
                                        <TableCell rowSpan={2}>{data.transaction_date}</TableCell>
                                        <TableCell rowSpan={2}>{data.description}</TableCell>
                                        <TableCell rowSpan={2}>{data.created_by?.name}</TableCell>
                                        <TableCell>{data.details[0]?.coa?.account_name}</TableCell>
                                        <TableCell className="text-right">{data.details[0]?.debit}</TableCell>
                                        <TableCell className="text-right">{data.details[0]?.credit}</TableCell>
                                        {/* <TableCell>
                                            <NormalBalanceBadge normalBalance={data.normal_balance} />
                                        </TableCell> */}
                                        <TableCell rowSpan={2}>
                                            {data.permissions?.view && (
                                                <Link
                                                    href={`journal/${data.id}`}
                                                    title="Detail"
                                                    className={buttonVariants({ size: 'sm', variant: 'outline' })}
                                                >
                                                    <EyeIcon />
                                                </Link>
                                            )}
                                            {data.permissions?.update && (
                                                <Link
                                                    href={`journal/${data.id}/edit`}
                                                    title="Edit"
                                                    className={buttonVariants({ size: 'sm' }) + ' mx-1'}
                                                >
                                                    <EditIcon />
                                                </Link>
                                            )}
                                            {data.permissions?.delete && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    title="Hapus"
                                                    onClick={() =>
                                                        setSelectedData((prev) => ({
                                                            ...prev,
                                                            id: data.id,
                                                            name: data.description,
                                                        }))
                                                    }
                                                >
                                                    <Trash2Icon />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={`table-row-child-${data.id}`}>
                                        <TableCell>{data.details[1]?.coa?.account_name}</TableCell>
                                        <TableCell className="text-right">{data.details[1]?.debit}</TableCell>
                                        <TableCell className="text-right">{data.details[1]?.credit}</TableCell>
                                    </TableRow>
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Data tidak tersedia
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">{total}</TableCell>
                            <TableCell className="text-right">{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            {handleRowDelete && (
                <AlertDialog open={!!selectedData.id}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus {selectedData.name}?</AlertDialogTitle>
                            <AlertDialogDescription>Aksi ini tidak dapat dibatalkan. Data akan dihapus secara permanen.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting} onClick={() => setSelectedData({ id: undefined, name: undefined })}>
                                Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className={buttonVariants({ variant: 'destructive' })}
                                onClick={() => {
                                    handleRowDelete(selectedData.id!);
                                    setSelectedData({ id: undefined, name: undefined });
                                }}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Menghapus...' : 'Hapus'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AppLayout>
    );
}
