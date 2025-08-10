import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        gender: string;
        total: number;
        fill: string;
    }[];
};
export default function ByGender() {
    const {
        byGender: { total, users },
    } = usePage().props as unknown as { byGender: Props };

    // console.log('byGender', byGender)
    console.log('total', total)
    console.log('users', users)
    return (
        <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[2500px] bg-amber-200">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={users} dataKey="total" nameKey="gender" innerRadius={60} strokeWidth={5}>
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
                    <Legend />
                </PieChart>
            </ChartContainer>
            {/* <p className="text-center text-lg font-bold">Presentase berdasarkan jenis kelamin</p> */}

      </CardContent>
    </Card>
    );
}
