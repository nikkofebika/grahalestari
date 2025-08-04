import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { normalBalanceLabels, normalBalances, TNormalBalance } from '@/types/coa';

type Props = {
    value: TNormalBalance;
    onChange: (value: TNormalBalance) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export function SelectNormalBalance({
    value,
    onChange,
    id = 'normal_balance',
    label,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 w-full',
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select value={value} onValueChange={(value) => onChange(value as TNormalBalance)}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {normalBalances.map((type: string) => (
                            <SelectItem key={type} value={type}>
                                {normalBalanceLabels[type as TNormalBalance]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
