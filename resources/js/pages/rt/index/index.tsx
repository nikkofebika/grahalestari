import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';
import useDeleteRow from '@/hooks/use-delete-row';
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TPaginate, TPermissionActions } from '@/types/global';
import { TTenant, TTenantFilters } from '@/types/tenant';
import { Link, usePage } from '@inertiajs/react';
import { ContactRoundIcon, EditIcon, EyeIcon, LucideIcon, PhoneIcon, Trash2Icon, UsersIcon } from 'lucide-react';

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
    permission_actions?: TPermissionActions;
};

export default function TenantIndex({ datas, filters, page: pageSize, per_page }: Props) {
    const auth = useAuth();

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
            {
                auth.user.type === 'god' ? (
                    <DataTable
                        datas={datas.data}
                        columns={[
                            {
                                label: 'Nama',
                                name: 'full_name',
                            },
                            {
                                label: 'Nomor RT',
                                name: 'number',
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
                    />
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {datas.data.map((data) => (
                            <RTCard key={data.id} data={data} handleRowDelete={handleRowDelete} isDeleting={isDeleting} />
                        ))}
                    </div>
                )
            }
            <PaginatePagination setPage={setPage} meta={datas.meta} />
        </AppLayout>
    );
}

function RTCard({
    data,
    handleRowDelete,
    isDeleting,
}: {
    data: TTenant;
    handleRowDelete?: (id: number) => void;
    isDeleting?: boolean;
}) {
    return (
        <Card className='shadow-lg'>
            <CardContent>
                <div className="flex gap-2 mb-5 h-12">
                    <div className='flex items-center justify-center w-12 rounded bg-slate-200'>
                        <p>RT</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-primary'>{data.full_name}</h2>
                        <h2 className='font-medium text-primary/50 text-sm'>{data.leader?.name}</h2>
                    </div>
                </div>
                <div className='space-y-2'>
                    <RTCardList title="Total Warga" value={data.total_users ?? 0} iconNode={UsersIcon} />
                    <RTCardList title="Total KK" value={data.total_kk ?? 0} iconNode={ContactRoundIcon} />
                    <RTCardList title="Kontak" value={data.leader?.detail?.phone ?? ''} iconNode={PhoneIcon} />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <div className="flex justify-between gap-2 w-full">
                    {
                        data.permissions?.update && (
                            <Link href={`rt/${data.id}/edit`} className={buttonVariants({ size: 'sm' }) + ' flex-1'}>
                                <EditIcon /> Edit
                            </Link>
                        )
                    }
                    <Link href={`rt/${data.id}`} className={buttonVariants({ size: 'sm', variant: 'outline' }) + ' flex-1'}>
                        <EyeIcon /> Detail
                    </Link>
                </div>
                {
                    (data.permissions?.delete && handleRowDelete) && (
                        <Button onClick={() => {
                            if (confirm('Hapus data RT ?')) handleRowDelete(data.id)
                        }} variant="destructive" className='w-full' disabled={isDeleting}>
                            <Trash2Icon /> Hapus
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )
}

function RTCardList({
    title,
    value,
    iconNode,
}: {
    title: string;
    value: number | string;
    iconNode?: LucideIcon;
}) {
    return (
        <div className='flex justify-between'>
            <div className='gap-1 flex justify-between items-center'>
                {iconNode && <Icon iconNode={iconNode} className='h-5 text-slate-600' />}
                <p>{title}</p>
            </div>
            <p>{value}</p>
        </div>
    )
}
