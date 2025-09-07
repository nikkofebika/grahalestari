import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    // data: Record<string, string>[];
    data: any;
    value?: number | string | null;
    onChange: (value: number | string | null) => void;
    id: string;
    valueKey?: string;
    labelKey?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
    errorMessage?: string;
    formDescription?: string;
    isWithSelectAll?: boolean;
    selectAllLabel?: string;
};

export function InputSelect({
    data,
    value,
    onChange,
    id,
    valueKey = 'id',
    labelKey = 'name',
    label,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'w-full',
    errorMessage,
    formDescription,
    isWithSelectAll = false,
    selectAllLabel,
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select
                value={String(value ?? '')}
                onValueChange={(value) => {
                    if (value === '' || value === 'all') {
                        onChange(null); // null kalau pilih kosong
                    } else {
                        onChange(Number(value));
                    }
                }}
            >
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {isWithSelectAll && <SelectItem value="all">{selectAllLabel ?? placeholder ?? '- Semua -'}</SelectItem>}
                        {data.map((item) => (
                            <SelectItem key={item[valueKey]} value={String(item[valueKey])}>
                                {item[labelKey]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {formDescription && <p className="text-sm text-gray-500">{formDescription}</p>}
            {errorMessage && <InputError className="mt-1" message={errorMessage} />}
        </div>
    );
}
