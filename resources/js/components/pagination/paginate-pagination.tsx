import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type Props = {
    meta: {
        from: number;
        to: number;
        total: number;
        current_page: number;
        last_page: number;
        next_page_url?: string | null;
        prev_page_url?: string | null;
    };
    setPage: Dispatch<SetStateAction<number>>;
};
export default function PaginatePagination({ meta, setPage }: Props) {
    return (
        <div className="items-center justify-between lg:flex">
            <div className="text-muted-foreground flex-1 text-sm lg:flex">
                Menampilkan {meta.from ?? 0} - {meta.to} dari {meta.total} data
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Page {meta.current_page} of {meta.last_page}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => setPage(1)} disabled={meta.current_page == 1}>
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => setPage((prev) => Number(prev) - 1)}
                        disabled={meta.current_page == 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className=""
                        size="icon"
                        onClick={() => setPage((prev) => Number(prev) + 1)}
                        disabled={meta.current_page == meta.last_page}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => setPage(meta.last_page)}
                        disabled={meta.current_page == meta.last_page}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
