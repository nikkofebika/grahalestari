/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser, TUserType, userTypes } from "@/types/user";

// export const setSelectNumberNullable = (value: number | null) => (value == null ? null : Number(value));
// convert value dari select/input ke number nullable
export const setSelectNumberNullable = (
    value: string | number | null | undefined
): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
};

// convert value number ke string nullable (biasanya buat defaultValue/value di select)
export const setSelectStringNullable = (
    value: number | string | null | undefined
): string | null => {
    if (value === null || value === undefined || value === '') return null;
    return String(value);
};

// Convert dari string ke boolean nullable
export const setSelectBooleanNullable = (
    value: string | boolean | null | undefined
): boolean | null => {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'boolean') return value;
    return value === 'true';
};

// Convert dari boolean ke string nullable
export const setSelectBooleanString = (
    value: boolean | string | null | undefined
): string | null => {
    if (value === null || value === undefined || value === '') return null;
    return value === true || value === 'true' ? 'true' : 'false';
};

export const toNullable = (value: string) => (value == '' ? null : value);
export const nullToStrip = (value: any | null) => (value ? value : '-');


export const getUserTypes = (user: TUser): TUserType[] => {
    switch (user.type) {
        case 'admin_rw':
            return ['admin_rw', 'admin_rt', 'user']
        case 'admin_rt':
            return ['admin_rt', 'user']
        case 'user':
            return ['user']
        default:
            return userTypes;
    }
}
