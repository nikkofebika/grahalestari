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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TItemPermissions } from '@/types/global';
import { Link } from '@inertiajs/react';
import get from 'lodash/get';
import { EditIcon, EyeIcon, Trash2Icon } from 'lucide-react';
import { ReactNode, useState } from 'react';

type Props<T> = {
    datas: T[];
    columns: {
        label: string;
        name: string;
        colSpan?: number;
        renderCell?: (row: T) => ReactNode;
    }[];
    // page: number;
    // setPage: Dispatch<SetStateAction<number>>;
    // perPage: number;
    // setPerPage: Dispatch<SetStateAction<number>>;
    // search: string;
    // setSearch: Dispatch<SetStateAction<string>>;
    getRowDetailUrl?: (row: T) => string;
    getRowEditUrl?: (row: T) => string;
    isDeleting?: boolean;
    handleRowDelete?: (id: number) => void;
    selectedDataLabel?: string;
};

export default function DefaultTable<T extends TItemPermissions>({
    datas,
    columns,
    // perPage,
    // setPerPage,
    // search,
    // setSearch,
    getRowDetailUrl,
    getRowEditUrl,
    isDeleting,
    handleRowDelete,
    selectedDataLabel = 'name',
}: Props<T>) {
    const [selectedData, setSelectedData] = useState<{
        id: number | undefined;
        name: string | undefined;
    }>({
        id: undefined,
        name: undefined,
    });

    const totalColumn = columns.length;

    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Select value={String(perPage)} onValueChange={(value) => setPerPage(Number(value))}>
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder="15" />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[15, 30, 50, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={String(pageSize)}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Label htmlFor="rows-per-page" className="text-md font-medium">
                        data per halaman
                    </Label>
                </div>
                <Input type="text" placeholder="Search..." className="w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            {columns?.map((column) => (
                                <TableHead key={`column-${column.name}`} colSpan={column.colSpan ?? 1}>
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead key="actions">Opsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas?.length ? (
                            datas.map((data, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.name}>{column.renderCell?.(data) ?? get(data, column.name)}</TableCell>
                                    ))}
                                    <TableCell className="flex gap-1">
                                        {data.permissions?.view && getRowDetailUrl && (
                                            <Link
                                                href={getRowDetailUrl(data)}
                                                title="Detail"
                                                className={buttonVariants({ size: 'sm', variant: 'outline' }) + ' m-0'}
                                            >
                                                <EyeIcon />
                                            </Link>
                                        )}
                                        {data.permissions?.update && getRowEditUrl && (
                                            <Link href={getRowEditUrl(data)} title="Edit" className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                                                <EditIcon />
                                            </Link>
                                        )}
                                        {data.permissions?.delete && handleRowDelete && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                title="Hapus"
                                                onClick={() =>
                                                    setSelectedData((prev) => ({
                                                        ...prev,
                                                        id: get(data, 'id'),
                                                        name: get(data, selectedDataLabel),
                                                    }))
                                                }
                                            >
                                                <Trash2Icon />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={totalColumn} className="text-center">
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
        </>
    );
}
