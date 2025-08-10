import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// Generic props
type Props<TFilters extends Record<string, string | number | boolean> = Record<string, string | number | boolean>> = {
    url: string;
    initialValue?: string;
    debounceMs?: number;
    existingFilters?: TFilters;
};

export default function usePeriodYearMonth<TFilters extends Record<string, string | number | boolean> = Record<string, string | number | boolean>>({
    url,
    initialValue = '',
    debounceMs = 0,
    existingFilters = {} as TFilters,
}: Props<TFilters>) {
    console.log('existingFilters', existingFilters);
    const [yearMonth, setYearMonth] = useState(initialValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            const cleanFilters = Object.fromEntries(Object.entries(existingFilters).filter(([_, v]) => v !== null && v !== ''));

            router.get(url, { filter: { ...cleanFilters, period: yearMonth } }, { preserveState: true, preserveScroll: true });
        }, debounceMs);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearMonth]);

    return { yearMonth, setYearMonth };
}
