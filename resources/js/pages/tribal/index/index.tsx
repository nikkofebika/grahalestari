import CustomLink from '@/components/custom-link';
import InputMonth from '@/components/form/input-month';
import IndexPageHeading from '@/components/headings/index-page-heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePeriodYearMonth from '@/hooks/use-period-year-month';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';
import { TData } from '@/types/global';
import { TJournalFilters } from '@/types/journal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Trial Balance',
        href: '/tribal',
    },
];

type Props = {
    datas: TData<TCoa>;
    filters: TJournalFilters;
};

export default function TribalIndex({ datas, filters }: Props) {
    const { yearMonth, setYearMonth } = usePeriodYearMonth({ url: route('tribal.index'), initialValue: filters.period });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Trial Balance" />
            <InputMonth id="period" value={yearMonth} onChange={(val) => setYearMonth(val)} />
            <div className="-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Account</TableHead>
                            <TableHead>Saldo Awal</TableHead>
                            <TableHead className="text-center">Debit</TableHead>
                            <TableHead className="text-center">Kredit</TableHead>
                            <TableHead className="text-center">Saldo Akhir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas.data?.length ? (
                            datas.data?.map((coaParent) => (
                                <>
                                    <TableRow key={coaParent.id}>
                                        <TableCell className="font-bold">{`(${coaParent.account_number}) ${coaParent.account_name}`}</TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell className="text-right">{coaParent.total_debit}</TableCell>
                                        <TableCell className="text-right">{coaParent.total_credit}</TableCell>
                                        <TableCell className="text-right">{coaParent.total_saldo}</TableCell>
                                    </TableRow>
                                    {coaParent.childs?.map((coa) => (
                                        <TableRow key={coa.id}>
                                            <TableCell>
                                                <CustomLink href={route('coas.show', coa.id)}>
                                                    {`\u00A0`.repeat(5)} {`(${coa.account_number}) ${coa.account_name}`}
                                                </CustomLink>
                                            </TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell className="text-right">{coa.total_debit}</TableCell>
                                            <TableCell className="text-right">{coa.total_credit}</TableCell>
                                            <TableCell className="text-right">{coa.total_saldo}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Data tidak tersedia
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">{data.total_debit}</TableCell>
                            <TableCell className="text-right">{data.total_credit}</TableCell>
                            <TableCell className="text-right">{data.total_saldo}</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </AppLayout>
    );
}
