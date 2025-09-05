import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCitizenFeeCategory } from '@/types/citizen-fee';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Iuran Warga',
        href: '/kategori-iuran-warga',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TCitizenFeeCategory;
};

export default function CitizenFeeCategoryShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Kategori Iuran Warga" backUrl="/kategori-iuran-warga" />
            <DetailCard data={data}>
                <Table>
                    <TableRow>
                        <TableCell className="font-bold">Nama</TableCell>
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Akun Sumber</TableCell>
                        <TableCell>{data.credit_coa?.account_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Akun Penerima</TableCell>
                        <TableCell>{data.debit_coa?.account_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Jumlah Iuran Yang Ditentukan</TableCell>
                        <TableCell>{data.fix_amount_formatted}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Deskripsi</TableCell>
                        <TableCell>{data.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Pada</TableCell>
                        <TableCell>
                            {data.created_at} {data.created_by ? 'oleh ' + data.created_by.name : ''}
                        </TableCell>
                    </TableRow>
                    {data.updated_by && (
                        <TableRow>
                            <TableCell className="font-bold">Diupdate Pada</TableCell>
                            <TableCell>
                                {data.updated_at} {data.updated_by ? 'oleh ' + data.updated_by.name : ''}
                            </TableCell>
                        </TableRow>
                    )}
                    {data.deleted_at && (
                        <TableRow>
                            <TableCell className="font-bold">Dihapus Pada</TableCell>
                            <TableCell>
                                {data.deleted_at} {data.deleted_by ? 'oleh ' + data.deleted_by.name : ''}
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </DetailCard>
        </AppLayout>
    );
}
