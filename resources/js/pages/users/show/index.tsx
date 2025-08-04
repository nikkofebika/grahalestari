import DetailCard from '@/components/detail-card';
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TUser } from '@/types/user';
import { HouseIcon, LucideIcon, MailIcon, PhoneIcon, TagIcon } from 'lucide-react';
import FamilyMembers from '../components/family-members';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TUser;
    family_members: TUser[];
};

export default function UserShow({ data, family_members }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail User" backUrl="/users" />
            <Card>
                <CardContent className="">
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        {/* Profile Image */}
                        <div className="border-muted h-40 w-40 overflow-hidden border">
                            <img src={data.image?.original_url} alt="User profile" className="h-full w-full object-cover" />
                        </div>

                        {/* User Info */}
                        <div className="space-y-2 text-center sm:text-left">
                            <h2 className="text-xl font-semibold">
                                {data.name}{' '}
                                <Badge variant="secondary">
                                    <TagIcon />
                                    {data.type}
                                </Badge>
                            </h2>

                            <UserInfoInline label="RW" value={data.group?.name ?? ''} icon={HouseIcon} />
                            <UserInfoInline label="RT" value={data.tenant?.name ?? ''} icon={HouseIcon} />
                            <UserInfoInline label="Phone" value={data.detail?.phone ?? ''} icon={PhoneIcon} />
                            <UserInfoInline label="Email" value={data.email} icon={MailIcon} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Tabs defaultValue="detail">
                <TabsList>
                    <TabsTrigger value="detail">Data Diri</TabsTrigger>
                    <TabsTrigger value="familyMembers">Keluarga</TabsTrigger>
                </TabsList>
                <TabsContent value="detail">
                    <DetailCard title="Data Diri" description="Detail data diri warga">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold">No. KK</TableCell>
                                    <TableCell>{data.detail?.no_kk}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">No. KTP</TableCell>
                                    <TableCell>{data.detail?.no_ktp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">No. Telepon</TableCell>
                                    <TableCell>{data.detail?.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">TanggalLahir</TableCell>
                                    <TableCell>{data.detail?.birth_date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Tempat Lahir</TableCell>
                                    <TableCell>{data.detail?.birth_place}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Jenis Kelamin</TableCell>
                                    <TableCell>{data.detail?.gender}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Agaa</TableCell>
                                    <TableCell>{data.detail?.religion}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Status Pernikahaan</TableCell>
                                    <TableCell>{data.detail?.marital_status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Pendidikan</TableCell>
                                    <TableCell>{data.detail?.education}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Pekerjaan</TableCell>
                                    <TableCell>{data.detail?.job}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Alamat</TableCell>
                                    <TableCell>{data.detail?.address}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DetailCard>
                </TabsContent>
                <TabsContent value="familyMembers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Keluarga</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <FamilyMembers familyMembers={family_members} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AppLayout>
    );
}

type UserInfoInlineProps = {
    label: string;
    value: string;
    icon?: LucideIcon; // Ini tipe dari Lucide icon (fungsi komponen)
};

export function UserInfoInline({ label, value, icon: Icon = TagIcon }: UserInfoInlineProps) {
    return (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4" />
            <span>{label}:</span>
            <span>{value}</span>
        </div>
    );
}
