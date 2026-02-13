import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

export const TopProductsChart = ({data}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
              <XAxis
                dataKey='productName'
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
              <Bar dataKey='totalQuantitySold' radius={[8, 8, 0, 0]}>
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
