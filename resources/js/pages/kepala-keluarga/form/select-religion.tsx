import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TReligion, religionTypeLabels, religionTypes } from '@/types/user';

type Props = {
    value: TReligion | '';
    onChange: (value: TReligion) => void;
    id?: string;
    placeholder?: string;
};

export function SelectReligion({ value, onChange, id = 'religion', placeholder = 'Pilih Agama' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TReligion)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {religionTypes.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {religionTypeLabels[value as TReligion]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
