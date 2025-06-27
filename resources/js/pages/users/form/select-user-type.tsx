import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserType, userTypeLabels, userTypes } from '@/types/user';

type Props = {
    value: UserType;
    onChange: (value: UserType) => void;
    id?: string;
    placeholder?: string;
};

export function SelectUserType({ value, onChange, id = 'type', placeholder = 'Pilih Tipe User' }: Props) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as UserType)}>
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {userTypes.map((type: string) => (
                        <SelectItem key={type} value={type}>
                            {userTypeLabels[type as UserType]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
