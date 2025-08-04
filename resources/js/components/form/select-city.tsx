import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type City = {
    id: number;
    nama: string;
};

type Props = {
    provinceId: number | null;
    value: number | null;
    onChange: (value: number) => void;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
};

export function SelectCity({ provinceId, value, onChange, id = 'city_id', placeholder = 'Pilih Kota', disabled }: Props) {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        if (!provinceId) return setCities([]);
        fetch(route('region.cities', provinceId))
            .then((res) => res.json())
            .then((data) => setCities(data.data));
    }, [provinceId]);

    return (
        <Select value={value !== null && value !== undefined ? value.toString() : ""} onValueChange={(val) => onChange(Number(val))} disabled={disabled || !provinceId}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
                <SelectGroup>
                    {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                            {city.nama}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
