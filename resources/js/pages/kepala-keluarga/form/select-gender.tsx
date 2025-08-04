import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TGender, genderTypeLabels, genderTypes } from '@/types/user';

type Props = {
    value: TGender | '';
    onChange: (value: TGender) => void;
    id?: string;
    placeholder?: string;
};

export function SelectGender({ value, onChange, id = 'gender', placeholder = 'Pilih Jenis Kelamin' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TGender)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {genderTypes.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {genderTypeLabels[value as TGender]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
