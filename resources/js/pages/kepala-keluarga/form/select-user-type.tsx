import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TUserType, userTypeLabels, userTypes } from '@/types/user';

type Props = {
    value: TUserType;
    onChange: (value: TUserType) => void;
    id?: string;
    placeholder?: string;
};

export function SelectTUserType({ value, onChange, id = 'type', placeholder = 'Pilih Tipe User' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as TUserType)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {userTypes.map((type: string) => (
                        <SelectItem key={type} value={type}>
                            {userTypeLabels[type as TUserType]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
