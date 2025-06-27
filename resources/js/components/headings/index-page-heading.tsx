import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';

type Props = {
    title: string;
    headTitle?: string;
    createUrl?: string;
};
export default function IndexPageHeading({ title, headTitle, createUrl }: Props) {
    return (
        <>
            <Head title={headTitle ?? title} />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
                {createUrl && (
                    <Link href={createUrl} className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                        <PlusIcon /> Tambah
                    </Link>
                )}
            </div>
        </>
    );
}
