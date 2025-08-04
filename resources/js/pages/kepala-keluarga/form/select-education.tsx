import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TEducation, educationTypes } from '@/types/user';

type Props = {
    value: TEducation | '';
    onChange: (value: TEducation) => void;
    id?: string;
    placeholder?: string;
};

export function SelectEducation({ value, onChange, id = 'education', placeholder = 'Pilih Pendidikan' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TEducation)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {educationTypes.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
