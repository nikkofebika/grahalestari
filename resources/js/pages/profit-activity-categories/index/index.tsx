import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TProfitActivityCategory, TProfitActivityCategoryFilters } from '@/types/profit-activity';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Kegiatan Profit',
        href: '/kategori-kegiatan-profit',
    },
];

type Props = {
    datas: TPaginate<TProfitActivityCategory>;
    filters: TProfitActivityCategoryFilters;
    page: number;
    per_page: number;
};

export default function ProfitActivityCategoryIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'kategori-kegiatan-profit.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Kategori Kegiatan Profit" createUrl="kategori-kegiatan-profit/create" />

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
                getRowDetailUrl={(data) => `kategori-kegiatan-profit/${data.id}`}
                getRowEditUrl={(data) => `kategori-kegiatan-profit/${data.id}/edit`}
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
