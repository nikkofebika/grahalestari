import InputMonth from '@/components/form/input-month'
import IndexPageHeading from '@/components/headings/index-page-heading'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import usePeriodYearMonth from '@/hooks/use-period-year-month'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { TCoa } from '@/types/coa'
import { TData } from '@/types/global'
import { TLaporanKeuanganFilters } from '@/types/laporan-keuangan'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Keuangan',
        href: '/laporan-keuangan',
    },
];

type Props = {
    datas: TData<TCoa>;
    posisi_keuangan: {
        total: string;
        datas: TData<TCoa>;
    };
    tribal: {
        datas: TData<TCoa>;
    };
    filters: TLaporanKeuanganFilters;
};

export default function LaporanKeuanganIndex({ datas, posisi_keuangan, tribal, filters }: Props) {
    console.log('filters', filters)
    const { yearMonth, setYearMonth } = usePeriodYearMonth({ url: route('laporan-keuangan.index'), initialValue: filters.period });

    const periodDate = new Date(filters.period).toLocaleString('en-US', {
        month: 'long', // "Oct"
        year: 'numeric' // "2025"
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Laporan Keuangan" />
            <InputMonth id="period" value={yearMonth} onChange={(val) => setYearMonth(val)} />
            <div className="">
                <Tabs defaultValue="laba-rugi-tabs" className='w-full'>
                    <TabsList className='w-full'>
                        <TabsTrigger value="laba-rugi-tabs">Laba Rugi</TabsTrigger>
                        <TabsTrigger value="posisi-keuangan-tabls">Posisi Keuangan</TabsTrigger>
                        <TabsTrigger value="neraca-tabs">Neraca</TabsTrigger>
                        <TabsTrigger value="summary-tabs">Summary</TabsTrigger>
                    </TabsList>
                    <TabsContent value="laba-rugi-tabs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Laporan Laba Rugi</CardTitle>
                                <CardDescription>
                                    Periode: {periodDate}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow className='border-none'>
                                            <TableCell className="font-bold text-green-600">PENERIMAAN</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            datas.data[1]?.childs?.length ? (
                                                datas.data[1].childs?.map((coa) => (
                                                    <TableRow key={coa.id}>
                                                        <TableCell>{`(${coa.account_number}) ${coa.account_name}`}</TableCell>
                                                        <TableCell className="text-right font-bold text-green-600">Rp {coa.total_saldo}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2} className="text-center">
                                                        Data tidak tersedia
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Penerimaan</TableCell>
                                            <TableCell className="text-right text-green-600">Rp {datas.data[1].total_saldo}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <Table>
                                    <TableHeader>
                                        <TableRow className='border-none'>
                                            <TableCell className="font-bold text-red-600">PENGELUARAN</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            datas.data[2].childs?.length ? (
                                                datas.data[2].childs.map((coa) => (
                                                    <TableRow key={coa.id}>
                                                        <TableCell>{`(${coa.account_number}) ${coa.account_name}`}</TableCell>
                                                        <TableCell className="text-right font-bold text-red-600">Rp {coa.total_saldo}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2} className="text-center">
                                                        Data tidak tersedia
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Pengeluaran</TableCell>
                                            <TableCell className="text-right text-red-600">Rp {datas.data[2].total_saldo}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <Table>
                                    <TableHeader>
                                        <TableRow className='border-none bg-slate-200'>
                                            <TableCell className="font-bold">LABA BERSIH</TableCell>
                                            <TableCell className={`font-bold text-right ${parseInt(datas.data[0].total_saldo ?? "0") > 0 ? 'text-green-600' : 'text-red-600'}`}>Rp {datas.data[0].total_saldo}</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="posisi-keuangan-tabls">
                        <Card>
                            <CardHeader>
                                <CardTitle>Laporan Posisi Keuangan</CardTitle>
                                <CardDescription>
                                    Periode: {periodDate}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                {/* max width xl and centered */}
                                <Table className="max-w-xl mx-auto">
                                    <TableHeader>
                                        <TableRow className='border-none'>
                                            <TableCell className="font-bold text-blue-600">HARTA LANCAR</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {posisi_keuangan.datas.data.map((coa) => (
                                            <TableRow key={coa.id}>
                                                <TableCell>{coa.account_name}</TableCell>
                                                <TableCell className="text-right font-bold text-blue-600">Rp {coa.total_saldo}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Harta</TableCell>
                                            <TableCell className="text-right text-blue-600">Rp {posisi_keuangan.total}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="neraca-tabs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Laporan Neraca</CardTitle>
                                <CardDescription>
                                    Periode: {periodDate}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode Akun</TableHead>
                                            <TableHead>Nama Akun</TableHead>
                                            <TableHead className="text-right">Debit</TableHead>
                                            <TableHead className="text-right">Kredit</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            tribal.datas.data.length ?
                                                (
                                                    tribal.datas.data.map((coa) => (
                                                        <TableRow key={coa.id}>
                                                            <TableCell>{coa.account_number}</TableCell>
                                                            <TableCell>{coa.account_name}</TableCell>
                                                            <TableCell className="text-right">{coa.total_debit}</TableCell>
                                                            <TableCell className="text-right">{coa.total_credit}</TableCell>
                                                            <TableCell className="text-right">{coa.total_saldo}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center">
                                                            Data tidak tersedia
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                        }
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
