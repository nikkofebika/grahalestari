import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    url: string;
    perPage: number;
    initialValue?: string;
    debounceMs?: number;
};
export default function useSearch({ url, perPage, initialValue = '', debounceMs = 500 }: Props) {
    const isFirstRender = useRef(true);
    const [search, setSearch] = useState(initialValue);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                url,
                {
                    page: 1,
                    per_page: perPage,
                    filter: {
                        search,
                    },
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, debounceMs);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return { search, setSearch };
}
