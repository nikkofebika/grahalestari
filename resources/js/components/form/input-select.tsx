import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type BaseProps = {
    data: any[];
    id: string;
    label?: string;
    valueKey?: string;
    labelKey?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
    formDescription?: string;
    isWithSelectAll?: boolean;
    selectAllLabel?: string;
    autoSelectIfSingle?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

type ControlledProps = {
    value: number | string | null;
    onChange: (value: number | string | null) => void;
    form?: never;
    name?: never;
};

type FormType = {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors?: Record<string, string | undefined>;
};

type FormProps = {
    form: FormType;
    name: string;
    value?: never;
    onChange?: never;
};

type Props = BaseProps & (ControlledProps | FormProps);

function isFormProps(x: Props): x is BaseProps & FormProps {
    return (x as any).form !== undefined && (x as any).name !== undefined;
}

export function InputSelect({
    data,
    id,
    label,
    valueKey = "id",
    labelKey = "name",
    placeholder,
    wrapperClassName = "grid gap-2",
    inputClassName = "w-full",
    formDescription,
    isWithSelectAll = false,
    selectAllLabel,
    autoSelectIfSingle = true,
    disabled = false,
    loading = false,
    ...rest
}: Props) {
    const formMode = isFormProps(rest);
    const value = formMode ? rest.form.data[rest.name] : (rest as ControlledProps).value;

    // --- FIXED AUTO SELECT ---
    useEffect(() => {
        if (!autoSelectIfSingle) return;
        if (!data || data.length !== 1) return;

        const singleValue = data[0][valueKey];
        if (!singleValue) return;

        // Hanya auto select kalau belum ada value
        if (value == null || value === "") {
            if (formMode) {
                rest.form.setData(rest.name, singleValue);
            } else {
                (rest as ControlledProps).onChange(singleValue);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, data?.length, autoSelectIfSingle, valueKey, value]);
    // --- END FIX ---

    const computedValue = useMemo(() => {
        return value === null ? (isWithSelectAll ? "all" : "") : String(value);
    }, [value, isWithSelectAll]);

    const handleChange = (val: string) => {
        const newVal =
            val === "all" || val === "" ? null : isNaN(Number(val)) ? val : Number(val);

        if (formMode) {
            rest.form.setData(rest.name, newVal);
        } else {
            (rest as ControlledProps).onChange(newVal);
        }
    };

    placeholder = placeholder ?? label;

    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}

            {loading ? (
                <Skeleton className={`h-9 rounded-md ${inputClassName}`} />
            ) : (
                <Select disabled={disabled} value={computedValue} onValueChange={handleChange}>
                    <SelectTrigger id={id} className={inputClassName}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {isWithSelectAll && data.length > 1 && (
                                <SelectItem value="all">
                                    {selectAllLabel ?? placeholder ?? "- Semua -"}
                                </SelectItem>
                            )}
                            {data.map((item) => (
                                <SelectItem key={item[valueKey]} value={String(item[valueKey])}>
                                    {item[labelKey]}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}

            {formDescription && <p className="text-sm text-gray-500">{formDescription}</p>}

            {formMode && rest.form.errors && rest.form.errors[rest.name] && (
                <InputError className="mt-1" message={rest.form.errors[rest.name]} />
            )}
        </div>
    );
}
