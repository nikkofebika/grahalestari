import { Badge } from '@/components/ui/badge';
import { citizenFeePaymentStatusLabels, TCitizenFeePaymentStatus } from '@/types/citizen-fee';

type Props = {
    payment_status: TCitizenFeePaymentStatus;
};
export default function CitizenFeePaymentStatusBadge({ payment_status }: Props) {
    if (payment_status === 'not_paid') {
        return (
            <Badge variant="secondary" className="bg-slate-500 text-white dark:bg-slate-600">
                {citizenFeePaymentStatusLabels[payment_status]}
            </Badge>
        );
    }

    if (payment_status === 'in_progress') {
        return (
            <Badge variant="secondary" className="bg-orange-500 text-white dark:bg-orange-600">
                {citizenFeePaymentStatusLabels[payment_status]}
            </Badge>
        );
    }

    if (payment_status === 'paid') {
        return (
            <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600">
                {citizenFeePaymentStatusLabels[payment_status]}
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className="bg-red-600 text-white dark:bg-red-700">
            {citizenFeePaymentStatusLabels[payment_status]}
        </Badge>
    );
}
