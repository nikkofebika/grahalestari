import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate } from '@/types/global';
import { TUser, TUserFilters } from '@/types/user';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

type Props = {
    datas: TPaginate<TUser>;
    filters: TUserFilters;
    page: number;
    per_page: number;
};

export default function UserIndex({ datas, filters, page: pageSize, per_page }: Props) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Users" createUrl="users/create" />

            <DataTable
                datas={datas.data}
                columns={[
                    {
                        label: 'Group',
                        name: 'group.name',
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
        </AppLayout>
    );
}
