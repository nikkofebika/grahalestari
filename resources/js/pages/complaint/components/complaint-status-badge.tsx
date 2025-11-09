import { Badge } from '@/components/ui/badge';
import { complaintStatusLabels, TComplaintStatus } from '@/types/complaint';

type Props = {
    status: TComplaintStatus;
};
export default function ComplaintStatusBadge({ status }: Props) {
    if (status === 'pending') {
        return (
            <Badge variant="secondary" className="bg-slate-500 text-white dark:bg-slate-600">
                {complaintStatusLabels[status]}
            </Badge>
        );
    }

    if (status === 'in_progress') {
        return (
            <Badge variant="secondary" className="bg-orange-500 text-white dark:bg-orange-600">
                {complaintStatusLabels[status]}
            </Badge>
        );
    }

    if (status === 'done') {
        return (
            <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600">
                {complaintStatusLabels[status]}
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className="bg-red-600 text-white dark:bg-red-700">
            {complaintStatusLabels[status]}
        </Badge>
    );
}
