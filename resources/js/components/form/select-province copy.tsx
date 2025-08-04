import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type Province = {
    id: number;
    nama: string;
};

type Props = {
    value: number | null;
    onChange: (value: number) => void;
    id?: string;
    placeholder?: string;
};

export function SelectProvince({ value, onChange, id = 'province_id', placeholder = 'Pilih Provinsi' }: Props) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    // const [search, setSearch] = useState('');
    // const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(route('region.provinces'))
            .then((res) => res.json())
            .then((data) => setProvinces(data.data));
    }, []);

    // const handleOpenChange = (open: boolean) => {
    //     if (open) {
    //         setTimeout(() => {
    //             inputRef.current?.focus();
    //         }, 0);
    //     }
    // };

    // const filtered = provinces.filter((prov) => prov.nama.toLowerCase().includes(search.toLowerCase()));

    return (
        <Select value={value?.toString()} onValueChange={(val) => onChange(Number(val))}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
                {/* <div className="sticky top-0 z-10 bg-white p-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onPointerDown={(e) => e.stopPropagation()}
                        placeholder="Cari provinsi..."
                        className="w-full border p-2 text-sm"
                    />
                </div> */}
                <SelectGroup>
                    {provinces.map((prov) => (
                        <SelectItem key={prov.id} value={prov.id.toString()}>
                            {prov.nama}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
