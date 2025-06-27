import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { complaintTargetScopeLabels, complaintTargetScopes, TComplaintTargetScope } from '@/types/complaint';

type Props = {
    value: TComplaintTargetScope;
    onChange: (value: TComplaintTargetScope) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export function SelectComplaintTargetScope({
    value,
    onChange,
    id = 'target_scope',
    label,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 w-full',
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select value={value} onValueChange={(value) => onChange(value as TComplaintTargetScope)}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {complaintTargetScopes.map((type: string) => (
                            <SelectItem key={type} value={type}>
                                {complaintTargetScopeLabels[type as TComplaintTargetScope]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
