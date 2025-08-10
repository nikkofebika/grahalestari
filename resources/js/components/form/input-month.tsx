import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    id: string;
    label?: string;
    value?: string; // format: "YYYY-MM"
    onChange: (val: string) => void;
    errorMessage?: string;
};

export default function InputMonth({ id, label, value, onChange, errorMessage }: Props) {
    return (
        <div className="grid gap-2">
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} type="month" value={value} onChange={(e) => onChange(e.target.value)} className="w-[200px]" />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
}
