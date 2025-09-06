import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TItemPermissions } from "@/types/global";
import { Link } from "@inertiajs/react";
import get from "lodash/get";
import { EditIcon, EyeIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props<T> = {
    datas: T[];
    columns: {
        label: string;
        name: string;
        colSpan?: number;
        renderCell?: (row: T) => ReactNode;
    }[];
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    perPage: number;
    setPerPage: Dispatch<SetStateAction<number>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    getRowDetailUrl?: (row: T) => string;
    getRowEditUrl?: (row: T) => string;
    isDeleting?: boolean;
    handleRowDelete?: (id: number) => void;
    selectedDataLabel?: string;
    extraRowActions?: (row: T) => ReactNode[];
};

export default function DataTable<T extends TItemPermissions>({
    datas,
    columns,
    perPage,
    setPerPage,
    search,
    setSearch,
    getRowDetailUrl,
    getRowEditUrl,
    isDeleting,
    handleRowDelete,
    selectedDataLabel = "name",
    extraRowActions,
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
            {/* Filter & search */}
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Select
                        value={String(perPage)}
                        onValueChange={(value) => setPerPage(Number(value))}
                    >
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
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border mt-4">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            {columns?.map((column) => (
                                <TableHead
                                    key={`column-${column.name}`}
                                    colSpan={column.colSpan ?? 1}
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead key="actions">Opsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas?.length ? (
                            datas.map((data, index) => {
                                const defaultActions: ReactNode[] = [];

                                if (data.permissions?.view && getRowDetailUrl) {
                                    defaultActions.push(
                                        <Link
                                            key="view"
                                            href={getRowDetailUrl(data)}
                                            className="flex items-center w-full"
                                        >
                                            <EyeIcon className="mr-2 h-4 w-4" />
                                            Detail
                                        </Link>
                                    );
                                }

                                if (data.permissions?.update && getRowEditUrl) {
                                    defaultActions.push(
                                        <Link
                                            key="edit"
                                            href={getRowEditUrl(data)}
                                            className="flex items-center w-full"
                                        >
                                            <EditIcon className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    );
                                }

                                if (data.permissions?.delete && handleRowDelete) {
                                    defaultActions.push(
                                        <button
                                            key="delete"
                                            onClick={() =>
                                                setSelectedData({
                                                    id: get(data, "id"),
                                                    name: get(data, selectedDataLabel),
                                                })
                                            }
                                            className="flex items-center w-full text-red-600"
                                        >
                                            <Trash2Icon className="mr-2 h-4 w-4" />
                                            Hapus
                                        </button>
                                    );
                                }

                                const extras = extraRowActions ? extraRowActions(data) : [];

                                return (
                                    <TableRow key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.name}>
                                                {column.renderCell?.(data) ?? get(data, column.name)}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-48" align="end">
                                                    <DropdownMenuGroup>
                                                        {defaultActions.map((action, i) => (
                                                            <DropdownMenuItem key={i} asChild>
                                                                {action}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuGroup>

                                                    {extras.length > 0 && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuGroup>
                                                                {extras.map((action, i) => (
                                                                    <DropdownMenuItem key={`extra-${i}`} asChild>
                                                                        {action}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuGroup>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
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

            {/* Dialog Delete */}
            {handleRowDelete && (
                <AlertDialog open={!!selectedData.id}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus {selectedData.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Aksi ini tidak dapat dibatalkan. Data akan dihapus secara
                                permanen.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                disabled={isDeleting}
                                onClick={() =>
                                    setSelectedData({ id: undefined, name: undefined })
                                }
                            >
                                Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                    handleRowDelete(selectedData.id!);
                                    setSelectedData({ id: undefined, name: undefined });
                                }}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Menghapus..." : "Hapus"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}
