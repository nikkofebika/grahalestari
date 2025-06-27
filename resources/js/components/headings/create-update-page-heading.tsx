import { Head, Link } from '@inertiajs/react';
import { ChevronLeftIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';

type Props = {
    title: string;
    headTitle?: string;
    backUrl?: string;
};
export default function CreateUpdatePageHeading({ title, headTitle, backUrl }: Props) {
    return (
        <>
            <Head title={headTitle ?? title} />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
                {backUrl && (
                    <Link href={backUrl} className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                        <ChevronLeftIcon /> Kembali
                    </Link>
                )}
            </div>
        </>
    );
}
