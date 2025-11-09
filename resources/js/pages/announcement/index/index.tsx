import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TAnnouncement, TAnnouncementFilters } from '@/types/announcement';
import { TPaginate } from '@/types/global';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: '/pengumuman',
    },
];

type Props = {
    datas: TPaginate<TAnnouncement>;
    filters: TAnnouncementFilters;
    page: number;
    per_page: number;
};

export default function AnnouncementIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'pengumuman.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Pengumuman" createUrl="pengumuman/create" />

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
                        label: 'Target',
                        name: 'target_scope',
                    },
                    {
                        label: 'Waktu Mulai',
                        name: 'start_at',
                    },
                    {
                        label: 'Waktu Selesai',
                        name: 'end_at',
                    },
                    {
                        label: 'Tgl Buat',
                        name: 'created_at',
                    },
                ]}
                page={page}
                setPage={setPage}
                perPage={perPage}
                getRowDetailUrl={(data) => `pengumuman/${data.id}`}
                getRowEditUrl={(data) => `pengumuman/${data.id}/edit`}
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
