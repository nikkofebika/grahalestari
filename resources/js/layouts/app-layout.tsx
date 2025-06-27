import { Toaster } from '@/components/ui/sonner';
import useToast from '@/hooks/use-toast';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AppSidebarLayout from './app/app-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    useToast();
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster richColors={true} />
        </AppSidebarLayout>
    );
};
