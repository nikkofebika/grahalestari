import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coa',
        href: '/coas',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TCoa;
};

export default function CoaShow({ data }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Coa" backUrl="/coas" />
            <DetailCard data={data}>
                <Table>
                    <TableRow>
                        <TableCell className="font-bold">Nama Akun</TableCell>
                        <TableCell>{data.account_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Nomor Akun</TableCell>
                        <TableCell>{data.account_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Saldo Normal</TableCell>
                        <TableCell>{data.normal_balance}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Pada</TableCell>
                        <TableCell>
                            {data.created_at} {data.created_by ? 'oleh ' + data.created_by.name : ''}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">Dibuat Oleh</TableCell>
                        <TableCell>{data.user?.name}</TableCell>
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
