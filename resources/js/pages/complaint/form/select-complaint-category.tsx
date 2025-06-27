import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { complaintCategories, complaintCategoryLabels, TComplaintCategory } from '@/types/complaint';

type Props = {
    value: TComplaintCategory;
    onChange: (value: TComplaintCategory) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export function SelectComplaintCategory({
    value,
    onChange,
    id = 'category',
    label,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 w-full',
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select value={value} onValueChange={(value) => onChange(value as TComplaintCategory)}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {complaintCategories.map((type: string) => (
                            <SelectItem key={type} value={type}>
                                {complaintCategoryLabels[type as TComplaintCategory]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
