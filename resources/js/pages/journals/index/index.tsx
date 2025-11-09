import InputMonth from '@/components/form/input-month';
import { InputSelect } from '@/components/form/input-select';
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
import usePeriodYearMonth from '@/hooks/use-period-year-month';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';
import { TData, TPermissionActions } from '@/types/global';
import { TJournal, TJournalFilters } from '@/types/journal';
import { Link, router } from '@inertiajs/react';
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
    coas: TCoa[];
    total: number;
    permission_actions?: TPermissionActions;
    filters: TJournalFilters;
    // page: number;
    // per_page: number;
};

export default function JournalIndex({ datas, coas, total, filters, permission_actions }: Props) {
    const { yearMonth, setYearMonth } = usePeriodYearMonth({ url: route('journals.index'), initialValue: filters.period });

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
            <div className="flex flex-wrap gap-2">
                <InputMonth id="filter_period" label="Periode" value={yearMonth} onChange={(val) => setYearMonth(val)} />
                <InputSelect
                    id="filter_coa_id"
                    label="Pilih Akun"
                    placeholder="Semua Akun"
                    labelKey="account_name"
                    data={coas}
                    value={filters.coa_id}
                    onChange={(val) =>
                        router.get(
                            route('journals.index'),
                            { filter: { period: yearMonth, coa_id: val } },
                            { preserveState: true, preserveScroll: true },
                        )
                    }
                    isWithSelectAll={true}
                />
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Tgl Transaksi</TableHead>
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
                                        <TableCell className="text-right">{data.details[0]?.debit_formatted}</TableCell>
                                        <TableCell className="text-right">{data.details[0]?.credit_formatted}</TableCell>
                                        {/* <TableCell>
                                            <NormalBalanceBadge normalBalance={data.normal_balance} />
                                        </TableCell> */}
                                        <TableCell rowSpan={2}>
                                            {data.permissions?.view && (
                                                <Link
                                                    href={`transactions/${data.id}`}
                                                    title="Detail"
                                                    className={buttonVariants({ size: 'sm', variant: 'outline' })}
                                                >
                                                    <EyeIcon />
                                                </Link>
                                            )}
                                            {data.permissions?.update && (
                                                <Link
                                                    href={`transactions/${data.id}/edit`}
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
                                        <TableCell>
                                            {`\u00A0`.repeat(5)}
                                            {data.details[1]?.coa?.account_name}
                                        </TableCell>
                                        <TableCell className="text-right">{data.details[1]?.debit_formatted}</TableCell>
                                        <TableCell className="text-right">{data.details[1]?.credit_formatted}</TableCell>
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
                            <TableCell></TableCell>
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
