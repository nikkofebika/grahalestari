import { InputSelect } from "@/components/form/input-select";
import CustomPageHeading from '@/components/headings/custom-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { setSelectNumberNullable } from "@/helpers/helper";
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate, TPermissionActions } from '@/types/global';
import { TTenant } from "@/types/tenant";
import { TUser, TUserFilters } from '@/types/user';
import { Link } from '@inertiajs/react';
import { DownloadIcon, PlusIcon } from 'lucide-react';
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Warga',
        href: '/users',
    },
];

type Props = {
    datas: TPaginate<TUser>;
    rts: TTenant[];
    filters: TUserFilters;
    page: number;
    per_page: number;
    permission_actions?: TPermissionActions;
};

export default function UserIndex({ datas, rts, filters, page: pageSize, per_page, permission_actions }: Props) {
    const [tenantId, setTenantId] = useState<number | null>(null);
    const { search, setSearch } = useSearch({
        url: datas.meta.path,
        initialValue: filters.search,
        perPage: per_page,
    });

    const { page, setPage, perPage, setPerPage } = usePagination({
        url: datas.meta.path,
        page: pageSize,
        perPage: per_page,
        filters,
    });

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'users.destroy' });


    // const formExportUsers = useForm<{ tenant_id: number | null }>({ tenant_id: null });
    // const submitExportUsers = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     formExportUsers.get(route('users.export'));
    // }

    const submitExportUsers = (e: React.FormEvent) => {
        e.preventDefault();

        window.open(route('users.export', { tenant_id: tenantId }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CustomPageHeading title="Warga">
                {(permission_actions?.create ?? true) && (
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"><DownloadIcon /> Export Data</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                                <form onSubmit={submitExportUsers}>
                                    <DialogHeader>
                                        <DialogTitle>Export Data Warga</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-5">
                                        <InputSelect
                                            id="export_select_tenant_id"
                                            label="Pilih RT"
                                            data={rts}
                                            value={tenantId}
                                            onChange={(value: number | string | null) => setTenantId(setSelectNumberNullable(value))}
                                            isWithSelectAll
                                            selectAllLabel="- Semua -"
                                            loading={!rts.length}
                                        />
                                        {/* <InputSelect
                                            id="export_select_tenant_id"
                                            label="Pilih RT"
                                            data={rts}
                                            form={formExportUsers}
                                            name="tenant_id"
                                            isWithSelectAll
                                            selectAllLabel="- Semua -"
                                            loading={!rts.length}
                                        /> */}
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit"><DownloadIcon /> Export Data</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Link href={route('users.create')} className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                            <PlusIcon /> Tambah
                        </Link>
                    </div>
                )
                }
            </CustomPageHeading >

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'RT',
                        name: 'tenant.name',
                    },
                    {
                        label: 'Nama',
                        name: 'name',
                    },
                    {
                        label: 'Email',
                        name: 'email',
                    },
                    {
                        label: 'Type',
                        name: 'type',
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
                setPerPage={setPerPage}
                search={search}
                getRowDetailUrl={(user) => route('users.show', user.id)}
                getRowEditUrl={(user) => route('users.edit', user.id)}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
            />

            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout >
    );
}
