import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { usePage } from '@inertiajs/react';
import { Label, Legend, Pie, PieChart } from 'recharts';

const chartConfig = {
    total: {
        label: 'Total Warga',
    },
    // male: {
    //     label: 'Laki-laki',
    //     color: 'var(--chart-1)',
    // },
    // female: {
    //     label: 'Perempuan',
    //     color: 'var(--chart-2)',
    // },
} satisfies ChartConfig;

type Props = {
    total: number;
    users: {
        religion: string;
        total: number;
        fill: string;
    }[];
};
export default function ByReligion() {
    const {
        byReligion: { total, users },
    } = usePage().props as unknown as { byReligion: Props };

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Presentasi Berdasarkan Agama</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[2500px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={users}
                            dataKey="total"
                            nameKey="religion"
                            innerRadius={60}
                            strokeWidth={5}
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
                                        <tspan x={x} dy="-0.4em">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </tspan>
                                        <tspan x={x} dy="1.2em" fontSize={12}>
                                            {users[index].religion} {/* ambil nama religion */}
                                        </tspan>
                                    </text>
                                );
                            }}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Total Warga
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                        {/* <Legend /> */}
                    </PieChart>
                </ChartContainer>
                {/* <p className="text-center text-lg font-bold">Presentase berdasarkan jenis kelamin</p> */}
            </CardContent>
        </Card>
    );
}
