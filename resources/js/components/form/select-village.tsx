import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type Village = {
    id: number;
    nama: string;
};

type Props = {
    districtId: number | null;
    value: number | null;
    onChange: (value: number) => void;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
};

export function SelectVillage({ districtId, value, onChange, id = 'village_id', placeholder = 'Pilih Kelurahan', disabled }: Props) {
    const [villages, setVillages] = useState<Village[]>([]);

    useEffect(() => {
        if (!districtId) return setVillages([]);
        fetch(route('region.villages', districtId))
            .then((res) => res.json())
            .then((data) => setVillages(data.data));
    }, [districtId]);

    return (
        <Select
            value={value !== null && value !== undefined ? value.toString() : ''}
            onValueChange={(val) => onChange(Number(val))}
            disabled={disabled || !districtId}
        >
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
                <SelectGroup>
                    {villages.map((village) => (
                        <SelectItem key={village.id} value={village.id.toString()}>
                            {village.nama}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
