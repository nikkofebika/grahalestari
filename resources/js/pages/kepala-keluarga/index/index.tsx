import CustomPageHeading from '@/components/headings/custom-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TUser, TUserFilters } from '@/types/user';
import { DownloadIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kepala Keluarga',
        href: '/kepala-keluarga',
    },
];

type Props = {
    datas: TPaginate<TUser>;
    filters: TUserFilters;
    page: number;
    per_page: number;
};

export default function KepalaKeluargaIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    const { handleRowDelete, isDeleting } = useDeleteRow({ routeName: 'kepala-keluarga.destroy' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CustomPageHeading title="Kepala Keluarga">
                <a href={route('kepala-keluarga.export')} className={buttonVariants({ variant: 'outline', size: 'sm' }) + ' m-0'}>
                    <DownloadIcon /> Export Data
                </a>
            </CustomPageHeading>

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
                        label: 'No. Tlp',
                        name: 'detail.phone',
                    },
                    {
                        label: 'Type',
                        name: 'type',
                    },
                    {
                        label: 'No. KK',
                        name: 'detail.no_kk',
                    },
                ]}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                search={search}
                getRowDetailUrl={(user) => route('kepala-keluarga.show', user.id)}
                // getRowEditUrl={(user) => route('kepala-keluarga.edit', user.id)}
                setSearch={setSearch}
                isDeleting={isDeleting}
                handleRowDelete={handleRowDelete}
            />

            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout>
    );
}
