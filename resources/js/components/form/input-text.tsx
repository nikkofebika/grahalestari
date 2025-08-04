import { InputHTMLAttributes } from 'react';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
    id: string;
    label: string;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    autocomplete?: string;
    placeholder?: string;
    disabled?: boolean;
    wrapperClassName?: string;
    inputClassName?: string;
    props?: InputHTMLAttributes<HTMLInputElement>;
};

export default function InputText({
    id,
    label,
    value,
    onChange,
    errorMessage,
    autocomplete,
    placeholder,
    disabled,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 block w-full',
    props,
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                className={inputClassName}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
                placeholder={placeholder}
                disabled={disabled}
                {...props}
            />
            {errorMessage && <InputError className="mt-1" message={errorMessage} />}
        </div>
    );
}
