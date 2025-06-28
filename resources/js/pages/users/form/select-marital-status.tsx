import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TMaritalStatus, maritalStatusTypeLabels, maritalStatusTypes } from '@/types/user';

type Props = {
    value: TMaritalStatus | '';
    onChange: (value: TMaritalStatus) => void;
    id?: string;
    placeholder?: string;
};

export function SelectMaritalStatus({ value, onChange, id = 'marital_status', placeholder = 'Pilih Status Pernikahan' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TMaritalStatus)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {maritalStatusTypes.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {maritalStatusTypeLabels[value as TMaritalStatus]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
