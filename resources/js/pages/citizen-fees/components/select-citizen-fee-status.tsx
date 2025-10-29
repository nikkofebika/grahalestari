import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    value: TCitizenFeeStatus;
    onChange: (value: TCitizenFeeStatus) => void;
    id?: string;
    placeholder?: string;
};

export function SelectCitizenFeeStatus({ value, onChange, id = 'status', placeholder = 'Pilih Status' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TCitizenFeeStatus)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {citizenFeeStatuses.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {citizenFeeStatusLabels[value as TCitizenFeeStatus]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
