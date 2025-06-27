import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    autocomplete?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
};

export default function InputDateTime({
    id,
    label,
    value,
    onChange,
    errorMessage,
    autocomplete,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 block w-full',
}: Props) {
    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                type="datetime-local"
                id={id}
                className={inputClassName}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
                placeholder={placeholder}
            />
            {errorMessage && <InputError className="mt-1" message={errorMessage} />}
        </div>
    );
}
