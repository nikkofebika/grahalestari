import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    label?: string;
    value?: { month: number; year: number };
    onChange: (value: { month: number; year: number }) => void;
    errorMessage?: string;
    startYear?: number;
    endYear?: number;
};

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export default function SelectMonthYear({
    label,
    value,
    onChange,
    errorMessage,
    startYear = new Date().getFullYear() - 5,
    endYear = new Date().getFullYear() + 5,
}: Props) {
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    return (
        <div className="grid gap-2">
            {label && <Label>{label}</Label>}
            <div className="flex gap-2">
                <Select
                    value={value?.month?.toString()}
                    onValueChange={(val) => onChange({ month: parseInt(val), year: value?.year ?? new Date().getFullYear() })}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                        {monthNames.map((name, index) => (
                            <SelectItem key={index} value={(index + 1).toString()}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={value?.year?.toString()} onValueChange={(val) => onChange({ month: value?.month ?? 1, year: parseInt(val) })}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((y) => (
                            <SelectItem key={y} value={y.toString()}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
}
