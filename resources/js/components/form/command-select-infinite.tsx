import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface SelectInfiniteIdProps<T> {
    endpoint: string;
    labelKey?: keyof T;
    valueKey?: keyof T;
    placeholder?: string;
    onChange?: (value: T[keyof T]) => void;
    value?: T[keyof T] | null;
    className?: string;
    initialSelectedItem?: T | null;
}

export function CommandSelectInfinite<T extends Record<string, string | number>>({
    endpoint,
    labelKey = 'name',
    valueKey = 'id',
    placeholder = 'Cari...',
    onChange,
    value = null,
    className,
    initialSelectedItem = null,
}: SelectInfiniteIdProps<T>) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [keySearch, setKeySearch] = useState('');
    const [page, setPage] = useState(1);
    const [data, setData] = useState<T[]>(initialSelectedItem ? [initialSelectedItem] : []);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    const selectedItem = data.find((item) => item[valueKey] === value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setPage(1);
            setKeySearch(search);
            setHasMore(true);
        }, 1000);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            if (!hasMore || loading) return;
            setLoading(true);
            try {
                const res = await fetch(`${endpoint}?filter[search]=${keySearch}&fields[users]=${String(valueKey)},${String(labelKey)}&page=${page}`);
                const json = await res.json();
                const newItems = json.data;

                setData((prev) => (page === 1 ? newItems : [...prev, ...newItems.filter((i) => !prev.some((p) => p[valueKey] === i[valueKey]))]));
                setHasMore(json.current_page == json.last_page);
            } catch (err) {
                console.error('Fetch error:', err);
            }
            setLoading(false);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, keySearch, page]);

    const handleScroll = () => {
        const el = listRef.current;
        if (!el || !hasMore) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={loading} className={cn('w-full justify-between', className)}>
                    {selectedItem?.[labelKey] ?? placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={4} className="w-full max-w-none min-w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Cari..." onValueChange={setSearch} className="h-9" />
                    <CommandList ref={listRef} onScroll={handleScroll} className="max-h-[200px] overflow-y-auto">
                        <CommandEmpty>Tidak ditemukan</CommandEmpty>

                        {data.map((item) => (
                            <CommandItem
                                key={item[valueKey]}
                                onSelect={() => {
                                    onChange?.(item[valueKey]);
                                    setOpen(false);
                                }}
                            >
                                {item[labelKey]}
                            </CommandItem>
                        ))}

                        {loading && (
                            <div className="flex justify-center py-2">
                                <div className="border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                            </div>
                        )}

                        {!loading && !hasMore && data.length > 0 && (
                            <div className="text-muted-foreground py-2 text-center text-sm">*End of list*</div>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
