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
                {familyMembers.map((user) => (
                    <TableRow key={`family-member-${user.id}`}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.detail?.no_ktp}</TableCell>
                        <TableCell>{user.detail?.gender}</TableCell>
                        <TableCell>{user.detail?.birth_place}</TableCell>
                        <TableCell>{user.detail?.birth_date}</TableCell>
                        <TableCell>{user.detail?.religion}</TableCell>
                        <TableCell>{user.detail?.education}</TableCell>
                        <TableCell>{user.detail?.job}</TableCell>
                        {(showDetailButton || showDeleteButton) && (
                            <TableCell>
                                {showDetailButton && (
                                    <Link
                                        href={route('users.show', user.id)}
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
                                                <AlertDialogTitle>Hapus {user.name}?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Aksi ini tidak dapat dibatalkan. Data akan dihapus secara permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className={buttonVariants({ variant: 'destructive' })}
                                                    onClick={() => {
                                                        handleRowDelete(user.id!);
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
