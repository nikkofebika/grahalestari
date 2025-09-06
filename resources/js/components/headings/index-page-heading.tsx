import { TPermissionActions } from '@/types/global';
import { Head, Link, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import HeadingMainTitle from './heading-main-title';

type Props = {
    title: string;
    headTitle?: string;
    createUrl?: string;
};
export default function IndexPageHeading({ title, headTitle, createUrl }: Props) {
    const permission_actions: TPermissionActions = usePage().props.permission_actions ?? {};

    return (
        <>
            <Head title={headTitle ?? title} />
            <div className="flex items-center justify-between">
                <HeadingMainTitle title={title} />
                {(permission_actions?.create ?? true) && createUrl && (
                    <Link href={createUrl} className={buttonVariants({ size: 'sm' }) + ' m-0'}>
                        <PlusIcon /> Tambah
                    </Link>
                )}
            </div>
        </>
    );
}
