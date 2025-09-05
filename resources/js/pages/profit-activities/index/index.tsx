import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TProfitActivity, TProfitActivityFilters } from '@/types/profit-activity';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kegiatan Profit',
        href: '/kegiatan-profit',
    },
];

type Props = {
    datas: TPaginate<TProfitActivity>;
    filters: TProfitActivityFilters;
    page: number;
    per_page: number;
};

export default function ProfitActivityIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    console.log('datas', datas)

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'kegiatan-profit.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Kegiatan Profit" createUrl="kegiatan-profit/create" />

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Nama',
                        name: 'name',
                    },
                    {
                        label: 'Kategori',
                        name: 'category.name',
                    },
                    {
                        label: 'Tanggal',
                        name: 'date',
                    },
                    {
                        label: 'Jumlah',
                        name: 'amount_formatted',
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
                getRowDetailUrl={(data) => `kegiatan-profit/${data.id}`}
                getRowEditUrl={(data) => `kegiatan-profit/${data.id}/edit`}
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
