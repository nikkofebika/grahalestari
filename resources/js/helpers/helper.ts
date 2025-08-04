/* eslint-disable @typescript-eslint/no-explicit-any */
export const setSelectNumberNullable = (value: number | null) => (value == null ? null : Number(value));
export const toNullable = (value: string) => (value == '' ? null : value);
export const nullToStrip = (value: any | null) => (value ? value : '-');
