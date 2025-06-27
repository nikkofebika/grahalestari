import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { announcementTargetScopeLabels, announcementTargetScopes, TAnnouncementTargetScope } from '@/types/announcement';

type Props = {
    value: TAnnouncementTargetScope;
    onChange: (value: TAnnouncementTargetScope) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export function SelectAnnouncementTargetScope({
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
            <Select value={value} onValueChange={(value) => onChange(value as TAnnouncementTargetScope)}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {announcementTargetScopes.map((type: string) => (
                            <SelectItem key={type} value={type}>
                                {announcementTargetScopeLabels[type as TAnnouncementTargetScope]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
