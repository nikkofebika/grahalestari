import { format, parseISO } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import InputError from '../input-error';

type Props = {
    id: string;
    value: string | null; // "YYYY-MM-DD"
    onChange: (val: string | null) => void;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

export default function DatePicker({ id, value, onChange, label, errorMessage, required = false, disabled = false, placeholder = 'Pilih tanggal' }: Props) {
    const [open, setOpen] = React.useState(false);

    const dateValue = value ? parseISO(value) : undefined;

    const handleSelect = (date: Date | undefined) => {
        if (!date) {
            onChange(null);
        } else {
            // Format to "YYYY-MM-DD"
            console.log('date', date);
            const formatted = format(date, 'yyyy-MM-dd');
            console.log('formatted', formatted);
            onChange(formatted);
        }
        setOpen(false);
    };

    return (
        <div className="grid gap-2">
            {label && (
                <Label htmlFor={id}>
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" disabled={disabled} className="w-full justify-between" id={id}>
                        {value ? format(parseISO(value), 'dd MMMM yyyy') : placeholder}
                        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateValue} onSelect={handleSelect} captionLayout="dropdown" />
                </PopoverContent>
            </Popover>
            {errorMessage && <InputError message={errorMessage} />}
        </div>
    );
}
