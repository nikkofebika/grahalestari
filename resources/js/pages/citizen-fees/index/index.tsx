import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { citizenFeeStatuses, citizenFeeStatusLabels, TCitizenFee, TCitizenFeeFilters, TCitizenFeeStatus, TUpdateStatusCitizenFee } from '@/types/citizen-fee';
import { TPaginate } from '@/types/global';
import { Link, useForm } from '@inertiajs/react';
import { ListIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import CitizenFeeStatusBadge from '../components/citizen-fee-status-badge';
import InputText from '@/components/form/input-text';
import { InputSelect } from '@/components/form/input-select';
import { SelectCitizenFeeStatus } from '../components/select-citizen-fee-status';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
];

type Props = {
    datas: TPaginate<TCitizenFee>;
    filters: TCitizenFeeFilters;
    page: number;
    per_page: number;
};

export default function CitizenFeeIndex({ datas, filters, page: pageSize, per_page }: Props) {
    const [selectedData, setSelectedData] = useState<TCitizenFee | null>(null);
    useEffect(() => {
        if (selectedData === null) {
            document.body.style.pointerEvents = "auto";
        }
    }, [selectedData]);

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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'iuran-warga.destroy' });

    const { data, setData, put, processing, errors } = useForm<TUpdateStatusCitizenFee>({
        status: null,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedData?.status !== data.status) {
            put(route('iuran-warga.update-status', selectedData?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedData(null);
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Iuran Warga" createUrl="iuran-warga/create" />
            <DataTable
                datas={datas.data}
                columns={[
                    { label: "Nama", name: "name" },
                    { label: "Kategori", name: "category.name" },
                    { label: "Tanggal", name: "date" },
                    { label: "Status", name: "status", renderCell: (data) => <CitizenFeeStatusBadge status={data.status} /> },
                    { label: "Total Pendapatan", name: "total_amount_formatted" },
                    { label: "Tgl Buat", name: "created_at" },
                    { label: "Tgl Update", name: "updated_at" },
                ]}
                page={page}
                setPage={setPage}
                perPage={perPage}
                getRowDetailUrl={(data) => `iuran-warga/${data.id}`}
                getRowEditUrl={(data) => `iuran-warga/${data.id}/edit`}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
                extraRowActions={(row) => [
                    <Link
                        key="list-details-option"
                        href={`iuran-warga/${row.id}/details`}
                    >
                        <ListIcon className="mr-2 h-4 w-4" /> List Pembayaran
                    </Link>,
                    <div
                        key="update-status-option"
                        onClick={() => {
                            setSelectedData(row)
                            setData('status', row.status)
                        }}
                    >
                        <PencilLineIcon className="mr-2 h-4 w-4" /> Update Status
                    </div>,
                ]}
            />
            <PaginatePagination setPage={setPage} meta={datas.meta} />
            <AlertDialog key={selectedData?.id} open={selectedData !== null} onOpenChange={(open) => !open && setSelectedData(null)}>
                <AlertDialogContent>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Update Status?</AlertDialogTitle>
                            <AlertDialogDescription>Update status {selectedData?.name}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            <SelectCitizenFeeStatus value={data.status!} onChange={(value) => setData('status', value)} />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button disabled={processing} type='submit'>
                                <SaveIcon /> Submit
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
