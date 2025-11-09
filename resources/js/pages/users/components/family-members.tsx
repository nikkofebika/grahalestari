import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TUser } from '@/types/user';
import { Link, router } from '@inertiajs/react';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type Props = {
    user: TUser;
    familyMembers: TUser[];
    showDetailButton?: boolean;
    showDeleteButton?: boolean;
};

export default function FamilyMembers({ user, familyMembers, showDetailButton, showDeleteButton }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRowDelete = (id: number) => {
        setIsDeleting(true);
        router.delete(route('kepala-keluarga.delete-member', { user_id: user.id, member_id: id }), {
            onFinish: () => setIsDeleting(false),
        });
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">Nama</TableHead>
                    <TableHead className="font-bold">NIK</TableHead>
                    <TableHead className="font-bold">Jenis Kelamin</TableHead>
                    <TableHead className="font-bold">Tempat Lahir</TableHead>
                    <TableHead className="font-bold">Tanggal Lahir</TableHead>
                    <TableHead className="font-bold">Agama</TableHead>
                    <TableHead className="font-bold">Pendidikan</TableHead>
                    <TableHead className="font-bold">Pekerjaan</TableHead>
                    {showDetailButton && <TableHead className="font-bold">Opsi</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {familyMembers.map((familyMember) => (
                    <TableRow key={`family-member-${familyMember.id}`}>
                        <TableCell>{familyMember.name}</TableCell>
                        <TableCell>{familyMember.detail?.no_ktp}</TableCell>
                        <TableCell>{familyMember.detail?.gender}</TableCell>
                        <TableCell>{familyMember.detail?.birth_place}</TableCell>
                        <TableCell>{familyMember.detail?.birth_date}</TableCell>
                        <TableCell>{familyMember.detail?.religion}</TableCell>
                        <TableCell>{familyMember.detail?.education}</TableCell>
                        <TableCell>{familyMember.detail?.job}</TableCell>
                        {(showDetailButton || showDeleteButton) && (
                            <TableCell>
                                {showDetailButton && (
                                    <Link
                                        href={route('users.show', familyMember.id)}
                                        title="Detail"
                                        className={buttonVariants({ size: 'sm', variant: 'outline' }) + ' m-0'}
                                    >
                                        <EyeIcon />
                                    </Link>
                                )}
                                {showDeleteButton && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">
                                                <Trash2Icon />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus {familyMember.name} dari daftar keluarga?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {familyMember.name} akan dihapus dari daftar anggota keluarga {user.name}.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className={buttonVariants({ variant: 'destructive' })}
                                                    onClick={() => {
                                                        handleRowDelete(familyMember.id!);
                                                    }}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? 'Menghapus...' : 'Hapus'}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
