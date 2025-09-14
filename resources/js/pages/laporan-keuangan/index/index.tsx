import InputMonth from '@/components/form/input-month'
import IndexPageHeading from '@/components/headings/index-page-heading'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
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
import { TLaporanKeuanganFilters } from '@/types/laporan-keuangan'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Keuangan',
        href: '/laporan-keuangan',
    },
];

type Props = {
    // datas: TData<TCoa>;
    filters: TLaporanKeuanganFilters;
};

export default function LaporanKeuanganIndex({ filters }: Props) {
    const { yearMonth, setYearMonth } = usePeriodYearMonth({ url: route('laporan-keuangan.index'), initialValue: filters.period });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <IndexPageHeading title="Laporan Keuangan" />
            <InputMonth id="period" value={yearMonth} onChange={(val) => setYearMonth(val)} />
            {/* <div className="flex w-full flex-col gap-6 bg-blue-300"> */}
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
                                    Periode: Januari 2024
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
                                            Array.from({ length: 5 }).map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell >Penerimaan {index + 1}</TableCell>
                                                    <TableCell className="text-right font-bold text-green-600">Rp 15.000.000</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Penerimaan</TableCell>
                                            <TableCell className="text-right text-green-600">Rp 15.000.000</TableCell>
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
                                            Array.from({ length: 5 }).map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell >Pengeluaran {index + 1}</TableCell>
                                                    <TableCell className="text-right font-bold text-red-600">Rp 15.000.000</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Pengeluaran</TableCell>
                                            <TableCell className="text-right text-red-600">Rp 15.000.000</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <Table>
                                    <TableHeader>
                                        <TableRow className='border-none bg-slate-200'>
                                            <TableCell className="font-bold">LABA BERSIH</TableCell>
                                            <TableCell className="font-bold text-right text-red-600">Rp 15.000.000</TableCell>
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
                                    Periode: Januari 2024
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
                                        <TableRow>
                                            <TableCell>Kas</TableCell>
                                            <TableCell className="text-right font-bold text-blue-600">Rp 10.000.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bank</TableCell>
                                            <TableCell className="text-right font-bold text-blue-600">Rp 10.000.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Piutan Iuran</TableCell>
                                            <TableCell className="text-right font-bold text-blue-600">Rp 10.000.000</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell className="font-bold">Total Harta</TableCell>
                                            <TableCell className="text-right text-blue-600">Rp 30.000.000</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="neraca-tabs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Laporan Laba Rugi</CardTitle>
                                <CardDescription>
                                    Periode: Januari 2024
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Kode Akun</TableHead>
                                            <TableHead>Nama Akun</TableHead>
                                            <TableHead className="text-right">Debit</TableHead>
                                            <TableHead className="text-right">Kredit</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>1-1000</TableCell>
                                            <TableCell>Kas</TableCell>
                                            <TableCell className="text-right">Rp 24.100.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>1-1100</TableCell>
                                            <TableCell>Bank</TableCell>
                                            <TableCell className="text-right">Rp 15.000.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>1-2000</TableCell>
                                            <TableCell>Piutang Iuran</TableCell>
                                            <TableCell className="text-right">Rp 3.500.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>4-1000</TableCell>
                                            <TableCell>Penerimaan Iuran Keamanan</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">Rp 15.000.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>4-1100</TableCell>
                                            <TableCell>Penerimaan Iuran Kebersihan</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">Rp 9.000.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>4-1200</TableCell>
                                            <TableCell>Penerimaan Iuran Sosial</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">Rp 3.000.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>4-2000</TableCell>
                                            <TableCell>Penerimaan Kegiatan Profit</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">Rp 15.250.000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>5-1000</TableCell>
                                            <TableCell>Biaya Gaji & Tunjangan</TableCell>
                                            <TableCell className="text-right">Rp 16.000.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>5-2000</TableCell>
                                            <TableCell>Biaya Perlengkapan</TableCell>
                                            <TableCell className="text-right">Rp 1.500.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>5-3000</TableCell>
                                            <TableCell>Biaya Operasional</TableCell>
                                            <TableCell className="text-right">Rp 3.000.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>5-4000</TableCell>
                                            <TableCell>Biaya Pemeliharaan</TableCell>
                                            <TableCell className="text-right">Rp 2.000.000</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={2} className="font-bold">TOTAL</TableCell>
                                            <TableCell className="text-right font-bold">Rp 65.100.000</TableCell>
                                            <TableCell className="text-right font-bold">Rp 42.250.000</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
