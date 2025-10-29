import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFee, TCitizenFeeFilters } from '@/types/citizen-fee';
import { TPaginate } from '@/types/global';
import { Link } from '@inertiajs/react';
import { ListIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    console.log('datas datas', datas);
    const [totals, setTotals] = useState<Record<number, string>>({});

    useEffect(() => {
        const ids = datas.data.map((d) => ({
            citizen_fee_category_id: d.citizen_fee_category_id,
            id: d.id,
        }));

        if (ids.length === 0) return;

        // konversi array object ke query string
        const params = new URLSearchParams();
        ids.forEach((item, index) => {
            params.append(`items[${index}][id]`, String(item.id));
            params.append(`items[${index}][citizen_fee_category_id]`, String(item.citizen_fee_category_id));
        });

        fetch(`/iuran-warga/get-total-paid-users?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => setTotals(data)) // { 1: "10/100", 2: "5/50", ... }
            .catch(() => setTotals({}));
    }, [datas.data]);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Iuran Warga" createUrl="iuran-warga/create" />
            <DataTable
                datas={datas.data}
                columns={[
                    { label: "Nama", name: "name" },
                    { label: "Kategori", name: "category.name" },
                    { label: "Tanggal Efektif", name: "effective_date" },
                    { label: "Jatuh Tempo", name: "due_date" },
                    { label: "Dibayar", name: "lunas", renderCell: (data) => totals[data.id] },
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
                    </Link>
                ]}
            />
            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout>
    );
}
