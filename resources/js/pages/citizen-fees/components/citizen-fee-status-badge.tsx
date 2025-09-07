import { Badge } from '@/components/ui/badge';
import { TCitizenFeeStatus } from '@/types/citizen-fee';

type Props = {
    status: TCitizenFeeStatus;
};
export default function CitizenFeeStatusBadge({ status }: Props) {
    if (status === 'in_progress') {
        return (
            <Badge variant="secondary" className="bg-slate-500 text-white dark:bg-slate-600">
                {status}
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className="bg-emerald-600 text-white dark:bg-emerald-700">
            {status}
        </Badge>
    );
}
