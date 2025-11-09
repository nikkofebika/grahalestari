import InputDateTime from '@/components/form/input-date-time';
import InputText from '@/components/form/input-text';
import IndexPageHeading from '@/components/headings/index-page-heading';
import PaginatePagination from '@/components/pagination/paginate-pagination';
import DataTable from '@/components/table/data-table';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import usePagination from '@/hooks/use-pagination';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFee, TCitizenFeeFilters, TCreateCitizenFeeDetail } from '@/types/citizen-fee';
import { TPaginate } from '@/types/global';
import { TUser } from '@/types/user';
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { SaveIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import CitizenFeePaymentStatusBadge from '../components/citizen-fee-status-badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
    {
        title: 'List Pembayaran',
        href: '',
    },
];

type Props = {
    datas: TPaginate<TUser>;
    citizen_fee: TCitizenFee;
    filters: TCitizenFeeFilters;
    page: number;
    per_page: number;
};

export default function CitizenFeeDetailsIndex({ datas, citizen_fee, filters, page: pageSize, per_page }: Props) {
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
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

    useEffect(() => {
        if (selectedUser === null) {
            document.body.style.pointerEvents = "auto";
        }
    }, [selectedUser]);

    const minAmountPay = citizen_fee.category?.fix_amount ? citizen_fee.category?.fix_amount : 0;
    const { data, setData, post, errors, processing, reset } = useForm<TCreateCitizenFeeDetail>({
        citizen_fee_id: citizen_fee.id,
        user_id: null,
        amount: minAmountPay,
        payment_at: format(new Date(), 'yyyy-MM-dd HH:mm'),
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('iuran-warga.details.store', citizen_fee), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedUser(null);
                reset();
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {selectedUser && <h1>{selectedUser.name}</h1>}
            <IndexPageHeading title={`List Pembayaran - ${citizen_fee.name}`} />
            <DataTable
                datas={datas.data}
                columns={[
                    { label: "Nama", name: "name" },
                    { label: "Status", name: "citizen_fee_detail.payment_status", renderCell: (data) => <CitizenFeePaymentStatusBadge payment_status={data.citizen_fee_detail?.payment_status ?? 'not_paid'} /> },
                    { label: "Tgl. Pembayaran", name: "citizen_fee_detail.payment_at" },
                    { label: "Total Pembayaran", name: "citizen_fee_detail.amount_formatted" },
                    { label: "Tgl. Approve", name: "citizen_fee_detail.payment_approved_at" },
                    { label: "Tgl Buat", name: "citizen_fee_detail.created_at" },
                ]}
                page={page}
                setPage={setPage}
                perPage={perPage}
                getRowDetailUrl={(data) => `details/${data.id}`}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                extraRowActions={(data) => [
                    <Button key={data.id} className='w-full' onClick={() => {
                        if (data.citizen_fee_detail) {
                            if (confirm('Apakah anda yakin ingin menghapus data pembayaran ini?')) {
                                router.delete(route('iuran-warga.details.destroy', [citizen_fee, data.id]), {
                                    preserveScroll: true
                                })
                            }
                        } else {
                            setSelectedUser(data);
                            setData('user_id', data.id);
                        }
                    }}>
                        {data.citizen_fee_detail ? 'Hapus Pembayaran' : 'Bayar'}
                    </Button>
                ]}
            />
            <PaginatePagination setPage={setPage} meta={datas.meta} />
            <Dialog
                key={selectedUser?.id}
                open={selectedUser !== null}
                onOpenChange={(open) => !open && setSelectedUser(null)}
            >
                <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <DialogHeader>
                            <DialogTitle>Pembayaran</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <InputText
                                id="name"
                                label="Nama Warga"
                                value={selectedUser?.name!}
                                props={{
                                    readOnly: true
                                }}
                            />
                            <InputDateTime
                                id='payment_at'
                                label='Tanggal Pembayaran'
                                value={data.payment_at}
                                onChange={(e) => setData('payment_at', e.target.value)}
                                errorMessage={errors.payment_at}
                            />
                            <InputText
                                id="amount"
                                label="Nominal Pembayaran"
                                value={data.amount}
                                onChange={(e) => setData('amount', Number(e.target.value))}
                                errorMessage={errors.amount}
                                props={{
                                    type: 'number',
                                    min: minAmountPay,
                                }}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={processing}>
                                <SaveIcon /> Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
