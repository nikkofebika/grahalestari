import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import HeadingMainTitle from './heading-main-title';

type Props = {
    title: string;
    headTitle?: string;
};
export default function CustomPageHeading({ title, headTitle, children }: PropsWithChildren<Props>) {
    return (
        <>
            <Head title={headTitle ?? title} />
            <div className="flex items-center justify-between">
                <HeadingMainTitle title={title} />
                {children}
            </div>
        </>
    );
}
