import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { announcementCategories, announcementCategoryLabels, TAnnouncementCategory } from '@/types/announcement';

type Props = {
    value: TAnnouncementCategory;
    onChange: (value: TAnnouncementCategory) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export function SelectAnnouncementCategory({
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
            <Select value={value} onValueChange={(value) => onChange(value as TAnnouncementCategory)}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {announcementCategories.map((type: string) => (
                            <SelectItem key={type} value={type}>
                                {announcementCategoryLabels[type as TAnnouncementCategory]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
