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
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TUser, TUserFilters } from '@/types/user';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { EditIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

type Props = {
    users: TPaginate<TUser>;
    filters: TUserFilters;
    page: number;
    per_page: number;
};

export default function UserIndex({ users, filters, page: pageSize, per_page }: Props) {
    console.log('filters', filters);
    console.log('pageSize', pageSize);
    console.log('per_page', per_page);
    const { search, setSearch } = useSearch({
        url: users.path,
        initialValue: filters.search,
        perPage: per_page,
    });

    const { page, setPage, perPage, setPerPage } = usePagination({
        url: users.path,
        page: pageSize,
        perPage: per_page,
        filters,
    });

    const [selectedData, setSelectedData] = useState<{
        id: number | undefined;
        name: string | undefined;
    }>({
        id: undefined,
        name: undefined,
    });

    const { delete: destroy, processing: isDeleting } = useForm();

    const handleDelete = (id: number) => {
        destroy(route('users.destroy', id), {
            onSuccess: () => {
                setSelectedData({
                    id: undefined,
                    name: undefined,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-balance">Users</h1>
                <Link href="/users/create" className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                    <PlusIcon /> Create
                </Link>
            </div>

            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Select value={String(perPage)} onValueChange={(value) => setPerPage(Number(value))}>
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder={page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[15, 30, 50, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Label htmlFor="rows-per-page" className="text-md font-medium">
                        entries per page
                    </Label>
                </div>
                <Input type="text" placeholder="Search..." className="w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((data: TUser) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell className="flex gap-1">
                                    <Link href={`/users/${data.id}/edit`} title="edit" className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                                        <EditIcon />
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        title="delete"
                                        onClick={() =>
                                            setSelectedData((prev) => ({
                                                ...prev,
                                                id: data.id,
                                                name: data.name,
                                            }))
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="items-center justify-between lg:flex">
                <div className="text-muted-foreground flex-1 text-sm lg:flex">
                    Showing {users.from} to {users.to} of {users.total} entries
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {users.current_page} of {users.last_page}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => setPage(1)}
                            disabled={users.current_page == 1}
                        >
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => setPage((prev) => Number(prev) - 1)}
                            disabled={users.current_page == 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className=""
                            size="icon"
                            onClick={() => setPage((prev) => Number(prev) + 1)}
                            disabled={!users.next_page_url}
                        >
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => setPage((prev) => Number(prev) + 1)}
                            disabled={!users.next_page_url}
                        >
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
            <AlertDialog open={!!selectedData.id}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedData.name}?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently deleted the data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting} onClick={() => setSelectedData({ id: undefined, name: undefined })}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className={buttonVariants({ variant: 'destructive' })}
                            onClick={() => handleDelete?.(selectedData.id!)}
                            disabled={isDeleting}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
