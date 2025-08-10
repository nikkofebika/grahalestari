import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type Props = {
    value?: string; // Format: YYYY-MM
    onChange?: (value: string) => void;
    minYear?: number;
    maxYear?: number;
    label?: string;
};

export default function MonthYearPicker({
    value,
    onChange,
    minYear = new Date().getFullYear() - 10,
    maxYear = new Date().getFullYear() + 10,
    label = 'Pilih Bulan & Tahun',
}: Props) {
    const [selectedYear, setSelectedYear] = useState(value?.split('-')[0] ?? new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState(value?.split('-')[1] ?? String(new Date().getMonth() + 1).padStart(2, '0'));

    const months = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const handleChange = (month: string, year: string) => {
        const result = `${year}-${month}`;
        onChange?.(result);
    };

    return (
        <div className="grid gap-2">
            <label className="text-sm font-medium">{label}</label>
            <div className="flex gap-2">
                <Select
                    value={selectedMonth}
                    onValueChange={(val) => {
                        setSelectedMonth(val);
                        handleChange(val, selectedYear);
                    }}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={selectedYear}
                    onValueChange={(val) => {
                        setSelectedYear(val);
                        handleChange(selectedMonth, val);
                    }}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
                            const year = (minYear + i).toString();
                            return (
                                <SelectItem key={year} value={year}>
                                    {year}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
