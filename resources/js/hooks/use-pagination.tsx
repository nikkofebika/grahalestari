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

    console.log('usePagination initialPage', initialPage);
    console.log('usePagination initialPerPage', initialPerPage);
    console.log('usePagination called');
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        console.log('usePagination useEffect called');
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
