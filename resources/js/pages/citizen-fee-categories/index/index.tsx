import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFeeCategory, TCitizenFeeCategoryFilters } from '@/types/citizen-fee';
import { TPaginate } from '@/types/global';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Iuran Warga',
        href: '/kategori-iuran-warga',
    },
];

type Props = {
    datas: TPaginate<TCitizenFeeCategory>;
    filters: TCitizenFeeCategoryFilters;
    page: number;
    per_page: number;
};

export default function CitizenFeeCategoryIndex({ datas, filters, page: pageSize, per_page }: Props) {
    console.log('datas datas', datas);
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'kategori-iuran-warga.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Kategori Iuran Warga" createUrl="kategori-iuran-warga/create" />

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Nama',
                        name: 'name',
                    },
                    {
                        label: 'Akun Sumber',
                        name: 'credit_coa.account_name',
                    },
                    {
                        label: 'Akun Penerima',
                        name: 'debit_coa.account_name',
                    },
                    {
                        label: 'Jumlah Iuran',
                        name: 'fix_amount_formatted',
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
                getRowDetailUrl={(data) => `kategori-iuran-warga/${data.id}`}
                getRowEditUrl={(data) => `kategori-iuran-warga/${data.id}/edit`}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
            />
            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout>
    );
}
