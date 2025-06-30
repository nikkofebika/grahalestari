import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TTenant, TTenantFilters } from '@/types/tenant';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RT',
        href: '/rt',
    },
];

type Props = {
    datas: TPaginate<TTenant>;
    filters: TTenantFilters;
    page: number;
    per_page: number;
    collection?: any;
};

export default function TenantIndex({ datas, filters, page: pageSize, per_page, permissions }: Props) {
    const props = usePage().props;
    console.log('TenantIndex props', props);
    console.log('permissions', permissions);

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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'rt.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="RT" createUrl="rt/create" />

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Nama',
                        name: 'name',
                    },
                    {
                        label: 'Ketua',
                        name: 'leader.name',
                    },
                    {
                        label: 'Alamat',
                        name: 'address',
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
                getRowDetailUrl={(data) => `rt/${data.id}`}
                getRowEditUrl={(data) => `rt/${data.id}/edit`}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
                permissions={permissions?.collection}
            />

            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout>
    );
}
