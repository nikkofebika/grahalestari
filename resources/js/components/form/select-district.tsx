import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type District = {
    id: number;
    nama: string;
};

type Props = {
    cityId: number | null;
    value: number | null;
    onChange: (value: number) => void;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
};

export function SelectDisctrict({ cityId, value, onChange, id = 'district_id', placeholder = 'Pilih Kecamatan', disabled }: Props) {
    const [districts, setDistricts] = useState<District[]>([]);

    useEffect(() => {
        if (!cityId) return setDistricts([]);
        fetch(route('region.districts', cityId))
            .then((res) => res.json())
            .then((data) => setDistricts(data.data));
    }, [cityId]);

    return (
        <Select value={value !== null && value !== undefined ? value.toString() : ""} onValueChange={(val) => onChange(Number(val))} disabled={disabled || !cityId}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
                <SelectGroup>
                    {districts.map((district) => (
                        <SelectItem key={district.id} value={district.id.toString()}>
                            {district.nama}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
