import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TChart } from '@/types/global';
import { User } from 'lucide-react';
import { ReactNode } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    title: ReactNode
    chart: TChart[]
};
export default function UserDemografiChart({ title, chart }: Props) {
    const customTooltip = ({ active, payload }: { active: boolean; payload: any[] }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{data.label}</p>
                    <p className="text-sm text-muted-foreground">
                        {data.value} orang ({data.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Pie
                                data={chart}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {chart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={customTooltip} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                    {chart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm">{item.label}</span>
                            </div>
                            <span className="text-sm font-medium">
                                {item.value} ({item.percentage}%)
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
