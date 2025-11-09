import DetailCard from '@/components/detail-card';
import InputDateTime from "@/components/form/input-date-time";
import InputTextArea from "@/components/form/input-text-area";
import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { nullToStrip } from '@/helpers/helper';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TComplaint, TComplaintStatus, THandleComplaintForm } from '@/types/complaint';
import { useForm } from "@inertiajs/react";
import { SaveIcon } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
    },
    {
        title: 'Detail',
        href: '',
    },
];

type Props = {
    data: TComplaint;
};

export default function ComplaintShow({ data: complaint }: Props) {
    const [open, setOpen] = useState<TComplaintStatus | null>(null);
    useEffect(() => {
        if (open === null) {
            document.body.style.pointerEvents = "auto";
            reset();
        }

        setData('status', open);
    }, [open]);

    // const minAmountPay = complaint.category?.fix_amount ? complaint.category?.fix_amount : 0;
    const { data, setData, put, errors, processing, reset } = useForm<THandleComplaintForm>({
        status: null,
        handled_feedback: null,
        handled_at: null,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('form', data);

        put(route('aduan-masyarakat.handle', complaint), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(null);
                reset();
            }
        });
    };

    console.log('errors', errors);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Detail Aduan Masyarakat" backUrl="/aduan-masyarakat" />
            <DetailCard data={complaint}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">Judul</TableCell>
                            <TableCell>{complaint.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Kategori</TableCell>
                            <TableCell>{complaint.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Status</TableCell>
                            <TableCell>{complaint.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Lokasi</TableCell>
                            <TableCell>{complaint.location}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Dilaporkan Pada</TableCell>
                            <TableCell>
                                {complaint.created_at} oleh {complaint.user?.name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Ditangani Pada</TableCell>
                            <TableCell>
                                {complaint.handled_at ? (
                                    <span>
                                        {complaint.handled_at} oleh {nullToStrip(complaint.handled_by?.name)}
                                    </span>
                                ) : (
                                    complaint.status === 'pending' && <Button
                                        onClick={() => {
                                            setOpen("in_progress");
                                        }}
                                    >Tangani</Button>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Catatan Penanganan</TableCell>
                            <TableCell>
                                {complaint.handled_at && <span>{complaint.handled_feedback}</span>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Selesai Pada</TableCell>
                            <TableCell>
                                {complaint.done_at ? (
                                    <span>
                                        {complaint.done_at} oleh {nullToStrip(complaint.done_by?.name)}
                                    </span>
                                ) : (
                                    complaint.status === 'in_progress' &&
                                    <Button
                                        onClick={() => {
                                            setOpen("done");
                                        }}
                                    >Selesaikan</Button>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Catatan Penyelesaian</TableCell>
                            <TableCell>
                                {complaint.done_at && <span>{complaint.done_feedback}</span>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Tanggapan pelapor</TableCell>
                            <TableCell>{complaint.feedback}</TableCell>
                        </TableRow>
                        {complaint.updated_by && (
                            <TableRow>
                                <TableCell className="font-bold">Diupdate Pada</TableCell>
                                <TableCell>
                                    {complaint.updated_at} {complaint.updated_by ? 'oleh ' + complaint.updated_by.name : ''}
                                </TableCell>
                            </TableRow>
                        )}
                        {complaint.deleted_at && (
                            <TableRow>
                                <TableCell className="font-bold">Dihapus Pada</TableCell>
                                <TableCell>
                                    {complaint.deleted_at} {complaint.deleted_by ? 'oleh ' + complaint.deleted_by.name : ''}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </DetailCard>
            <Dialog
                open={open != null}
                onOpenChange={(open) => open != null && setOpen(null)}
            >
                <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <DialogHeader>
                            <DialogTitle>Tangani Aduan Masyarakat</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <InputDateTime
                                id='handled_at'
                                label='Ditangani Pada'
                                value={data.handled_at ?? ""}
                                onChange={(e) => setData("handled_at", e.target.value)}
                                errorMessage={errors.handled_at}
                            />
                            <InputTextArea
                                id="in_progress"
                                label="Catatan"
                                value={data.handled_feedback ?? ""}
                                onChange={(e) => setData("handled_feedback", e.target.value)}
                                errorMessage={errors.handled_feedback}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={processing}>
                                <SaveIcon /> Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
