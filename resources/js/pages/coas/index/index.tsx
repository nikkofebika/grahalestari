import IndexPageHeading from '@/components/headings/index-page-heading';
import NormalBalanceBadge from '@/components/normal-balance-badge';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDeleteRow from '@/hooks/use-delete-row';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';
import { TData } from '@/types/global';
import { Link } from '@inertiajs/react';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { Fragment, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coa',
        href: '/coas',
    },
];

type Props = {
    datas: TData<TCoa>;
    // filters: TCoaFilters;
    // page: number;
    // per_page: number;
};

export default function CoaIndex({ datas }: Props) {
    console.log('datas', datas);
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'coas.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Coa" createUrl="coas/create" />

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Nomor Akun</TableHead>
                            <TableHead>Nama Akun</TableHead>
                            <TableHead>Saldo Normal</TableHead>
                            <TableHead>Opsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas?.data.length ? (
                            datas.data.map((data) => (
                                <Fragment key={`fragment-${data.id}`}>
                                    <TableRow key={`table-row-${data.id}`}>
                                        <TableCell className="font-bold">{data.account_number}</TableCell>
                                        <TableCell className="font-bold">{data.account_name}</TableCell>
                                        <TableCell>
                                            <NormalBalanceBadge normalBalance={data.normal_balance} />
                                        </TableCell>
                                        <TableCell className="flex gap-1">&nbsp;</TableCell>
                                    </TableRow>
                                    {data.childs.map((child) => (
                                        <TableRow key={`table-row-${child.id}`}>
                                            <TableCell>
                                                <span className="ml-5">{child.account_number}</span>
                                            </TableCell>
                                            <TableCell>{child.account_name}</TableCell>
                                            <TableCell>
                                                <NormalBalanceBadge normalBalance={child.normal_balance} />
                                            </TableCell>
                                            <TableCell className="flex gap-1">
                                                {data.permissions?.update && (
                                                    <Link
                                                        href={route('coas.edit', child.id)}
                                                        title="Edit"
                                                        className={buttonVariants({ size: 'sm' }) + ' m-0'}
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
                                                                id: child.id,
                                                                name: child.account_name,
                                                            }))
                                                        }
                                                    >
                                                        <Trash2Icon />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Data tidak tersedia
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
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

            {/* <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Nama Akun',
                        name: 'account_name',
                    },
                    {
                        label: 'Nomor Akun',
                        name: 'account_number',
                    },
                    {
                        label: 'Saldo Normal',
                        name: 'normal_balance',
                        renderCell: (data) => <NormalBalanceBadge normalBalance={data.normal_balance} />,
                    },
                    {
                        label: 'Tgl Buat',
                        name: 'created_at',
                    },
                    {
                        label: 'Tgl Update',
                        name: 'updated_at',
                    },
                ]}
                page={page}
                setPage={setPage}
                perPage={perPage}
                getRowDetailUrl={(data) => `coas/${data.id}`}
                getRowEditUrl={(data) => `coas/${data.id}/edit`}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
            /> */}

            {/* <PaginatePagination setPage={setPage} meta={datas.meta} /> */}
        </AppLayout>
    );
}
