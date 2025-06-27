import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveIcon } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
    children: React.ReactNode;
    title?: string;
    description?: string;
    contentClassName?: string;
    submitTitle?: string;
    processing?: boolean;
};

export default function FormCard({ children, title, description, contentClassName = 'space-y-5', submitTitle, processing }: Props) {
    return (
        <Card className="w-full">
            {(title || description) && (
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            )}
            <CardContent className={contentClassName}>
                {children}
                {(submitTitle || processing) && (
                    <Button disabled={processing} className="w-full">
                        <SaveIcon /> {submitTitle}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
