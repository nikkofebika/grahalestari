import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

type Props = {
    title: string;
    headTitle?: string;
};
export default function CustomPageHeading({ title, headTitle, children }: PropsWithChildren<Props>) {
    return (
        <>
            <Head title={headTitle ?? title} />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
                {children}
            </div>
        </>
    );
}
