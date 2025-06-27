export type TRole = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type TRoleFilters = {
    search: string;
};

export type TCreateRole = {
    name: string;
    permissions: string[];
};
