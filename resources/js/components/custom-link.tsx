import { Link } from '@inertiajs/react';

type Props = {
    href: string;
    className?: string;
    children: React.ReactNode;
};
export default function CustomLink({ href, className, children }: Props) {
    return (
        <Link href={href} className={`text-blue-600 hover:text-blue-800 ${className}`}>
            {children}
        </Link>
    );
}
