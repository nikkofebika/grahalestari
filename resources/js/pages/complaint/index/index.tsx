import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TComplaint, TComplaintFilters } from '@/types/complaint';
import { TPaginate } from '@/types/global';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
    },
];

type Props = {
    datas: TPaginate<TComplaint>;
    filters: TComplaintFilters;
    page: number;
    per_page: number;
};

export default function ComplaintIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'aduan-masyarakat.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Aduan Masyarakat" createUrl="aduan-masyarakat/create" />

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Judul',
                        name: 'title',
                    },
                    {
                        label: 'Dibuat Oleh',
                        name: 'user.name',
                    },
                    {
                        label: 'Kategori',
                        name: 'category',
                    },
                    {
                        label: 'Status',
                        name: 'status',
                    },
                    {
                        label: 'Lokasi',
                        name: 'location',
                    },
                    {
                        label: 'Ditangani Pada',
                        name: 'handled_at',
                    },
                    {
                        label: 'Selesai Pada',
                        name: 'done_at',
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
                getRowDetailUrl={(data) => `aduan-masyarakat/${data.id}`}
                getRowEditUrl={(data) => `aduan-masyarakat/${data.id}/edit`}
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
