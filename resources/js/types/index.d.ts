import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { TUser, TUserType } from './user';

export interface Auth {
    user: TUser;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavTenant {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    allowUserType?: TUserType[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}
