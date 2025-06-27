import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props<T> = {
    data?: T;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    contentClassName?: string;
};

export default function DetailCard<T>({ children, title, description, contentClassName = 'space-y-5' }: Props<T>) {
    return (
        <Card className="w-full">
            {(title || description) && (
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            )}
            <CardContent className={contentClassName}>{children}</CardContent>
        </Card>
    );
}
