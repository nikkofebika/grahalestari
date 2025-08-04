import { Badge } from '@/components/ui/badge';
import { TNormalBalance } from '@/types/coa';

type Props = {
    normalBalance: TNormalBalance;
};
export default function NormalBalanceBadge({ normalBalance }: Props) {
    if (normalBalance === 'debit') {
        return (
            <Badge variant="secondary" className="bg-emerald-600 text-white dark:bg-emerald-700">
                {normalBalance}
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className="bg-rose-600 text-white dark:bg-rose-700">
            {normalBalance}
        </Badge>
    );
}
