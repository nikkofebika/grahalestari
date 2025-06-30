import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    url: string;
    page: number;
    perPage: number;
    filters?: Record<string, string>;
};
export default function usePagination({ url, page: initialPage = 1, perPage: initialPerPage, filters }: Props) {
    const isFirstRender = useRef(true);
    const [page, setPage] = useState(initialPage);
    const [perPage, setPerPage] = useState(initialPerPage);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        router.get(
            url,
            {
                page,
                per_page: perPage,
                filter: {
                    ...filters,
                },
            },
            {
                preserveState: true,
                replace: true,
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage]);

    return { page, setPage, perPage, setPerPage };
}
