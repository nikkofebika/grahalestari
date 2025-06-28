import { TableCell, TableRow } from '@/components/ui/table';
import { TTenant } from '@/types/tenant';

type Props = {
    data?: TTenant;
};
export default function LocationInfoShow({ data }: Props) {
    return (
        data && (
            <>
                <TableRow>
                    <TableCell className="font-bold">Provinsi</TableCell>
                    <TableCell>{data.province_name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Kota/Kabupaten</TableCell>
                    <TableCell>{data.city_name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Kecamatan</TableCell>
                    <TableCell>{data.district_name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Kelurahan</TableCell>
                    <TableCell>{data.village_name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Alamat</TableCell>
                    <TableCell>{data.address}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Kode POS</TableCell>
                    <TableCell>{data.postal_code}</TableCell>
                </TableRow>
            </>
        )
    );
}
