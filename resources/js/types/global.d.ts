import type { route as routeFn } from 'ziggy-js';
import { TUser } from './user';

declare global {
    const route: typeof routeFn;
}

type TLinks = {
    first?: string | null;
    last?: string | null;
    prev: string | null;
    next: string | null;
};

type TMetaPaginationBase = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
};

export type TPaginate<T> = {
    data: T[];
    links: TLinks;
    meta: TMetaPaginationBase & {
        links: { url: string | null; label: string; active: boolean }[];
        total: number;
    };
};

export type TSimplePaginate<T> = {
    data: T[];
    links: TLinks;
    meta: TMetaPaginationBase & {
        current_page_url: string;
    };
};

export type TData<T> = {
    data: T[];
};

export type TMedia = {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: string[];
    custom_properties: string[];
    generated_conversions: string[];
    responsive_images: string[];
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;
    preview_url: string;
};

export type TFilterPage = {
    page: number;
    per_page: number;
};

export type TSoftDelete = {
    deleted_at: string | null;
    deleted_by_id: int | null;
    deleted_by?: TUser;
};

export type TCreatedInfo = {
    created_by_id: int | null;
    created_by?: TUser;
};

export type TUpdatedInfo = {
    updated_by_id: int | null;
    updated_by?: TUser;
};

export type TCreatedUpdatedDeletedInfo = TSoftDelete & TCreatedInfo & TUpdatedInfo;

type TBaseTPermission = Record<'create' | 'view' | 'update' | 'delete' | string, boolean>;
export type TItemPermissions = {
    permissions: Partial<TBasePermission>;
};
export type TPermissionActions = Partial<TBaseTPermission>;

export type TAuthProps<T = Record<string, unknown>> = T & {
    auth: {
        user: TUser
    }
}

export type TChart = {
    label: string;
    value: number;
    percentage: number;
    color: string;
}
