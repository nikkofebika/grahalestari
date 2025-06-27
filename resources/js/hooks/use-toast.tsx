import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function useToast() {
    const { flash } = usePage().props as unknown as { flash?: { success: string; info: string; warning: string; error: string } };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.info) {
            toast.info(flash.info);
        } else if (flash?.warning) {
            toast.warning(flash.warning);
        } else if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
}
