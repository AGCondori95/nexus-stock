import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

export const RevenueChart = ({data}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='5%'
                    stopColor='hsl(var(--primary))'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='95%'
                    stopColor='hsl(var(--primary))'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
              <XAxis
                dataKey='month'
                className='text-xs'
                tick={{fill: "hsl(var(--muted-foreground))"}}
              />
              <YAxis
                className='text-xs'
                tick={{fill: "hsl(var(--muted-foreground))"}}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type='monotone'
                dataKey='revenue'
                stroke='hsl(var(--primary))'
                fillOpacity={1}
                fill='url(#colorRevenue)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
