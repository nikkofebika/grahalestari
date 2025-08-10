import CustomLink from '@/components/custom-link';
import InputMonth from '@/components/form/input-month';
import { InputSelect } from '@/components/form/input-select';
import IndexPageHeading from '@/components/headings/index-page-heading';
import NormalBalanceBadge from '@/components/normal-balance-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePeriodYearMonth from '@/hooks/use-period-year-month';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';
import { TData } from '@/types/global';
import { TJournalFilters } from '@/types/journal';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ledger',
        href: '/ledger',
    },
];

type Props = {
    datas: TData<TCoa>;
    coas: TCoa[];
    filters: TJournalFilters;
};

export default function LedgerIndex({ datas, filters, coas }: Props) {
    const { yearMonth, setYearMonth } = usePeriodYearMonth<TJournalFilters>({
        url: route('ledger.index'),
        initialValue: filters.period,
        existingFilters: filters,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Ledger" />
            <div className="flex flex-wrap gap-2">
                <InputMonth id="filter_period" label="Periode" value={yearMonth} onChange={(val) => setYearMonth(val)} />
                <InputSelect
                    id="filter_coa_id"
                    label="Pilih Akun"
                    placeholder="Semua Akun"
                    labelKey="account_name"
                    data={coas}
                    value={filters.coa_id}
                    onChange={(val) =>
                        router.get(
                            route('ledger.index'),
                            { filter: { period: yearMonth, coa_id: val } },
                            { preserveState: true, preserveScroll: true },
                        )
                    }
                    isWithSelectAll={true}
                />
            </div>
            {datas.data.map((data) => (
                <Card key={data.id}>
                    <CardHeader className="">
                        <CardTitle className="flex items-center gap-2">
                            {data.account_name} <NormalBalanceBadge normalBalance={data.normal_balance} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="-hidden rounded-lg border">
                            <Table>
                                <TableHeader className="bg-muted sticky top-0 z-10">
                                    <TableRow>
                                        <TableHead>Tgl Transaksi</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                        <TableHead className="text-center">Debit</TableHead>
                                        <TableHead className="text-center">Kredit</TableHead>
                                        <TableHead className="text-center">Saldo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.journal_details?.length ? (
                                        data.journal_details?.map((journalDetail) => (
                                            <TableRow key={journalDetail.id}>
                                                <TableCell>{journalDetail.journal?.transaction_date}</TableCell>
                                                <TableCell>
                                                    <CustomLink href={route('transactions.show', journalDetail.journal)}>
                                                        {journalDetail.journal?.description}
                                                    </CustomLink>
                                                </TableCell>
                                                <TableCell className="text-right">{journalDetail.debit_formatted}</TableCell>
                                                <TableCell className="text-right">{journalDetail.credit_formatted}</TableCell>
                                                <TableCell className="text-right">{journalDetail.saldo}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                Data tidak tersedia
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2}>Total</TableCell>
                                        <TableCell className="text-right">{data.total_debit}</TableCell>
                                        <TableCell className="text-right">{data.total_credit}</TableCell>
                                        <TableCell className="text-right">{data.total_saldo}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </AppLayout>
    );
}
