/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNullable = (value: string) => (value == '' ? null : value);
export const nullToStrip = (value: any | null) => (value ? value : '-');
