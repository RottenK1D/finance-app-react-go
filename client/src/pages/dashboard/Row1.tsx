import DashboardBox from "@/components/layout/DashboardBox";
import { useGetKpisQuery } from "@/lib/api";
import { useMemo } from "react";
import BoxHeader from "@/components/layout/BoxHeader";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Row1 = () => {
  const { data: revenueData } = useGetKpisQuery();
  const revenueExpenses = useMemo(
    () =>
      revenueData &&
      revenueData[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue,
        expenses,
      })),
    [revenueData]
  );

  const revenueProfit = useMemo(
    () =>
      revenueData &&
      revenueData[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2),
      })),
    [revenueData]
  );

  const revenue = useMemo(
    () =>
      revenueData &&
      revenueData[0].monthlyData.map(({ month, revenue }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
      })),
    [revenueData]
  );

  return (
    <>
      {/* REVENUE AND EXPENSES */}
      <DashboardBox style={{ gridArea: "a" }}>
        <BoxHeader
          title="Revenue and Expenses"
          sideText="+4%"
          subtitle="top line represents revenue, bottom line represents expenses"
        />
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart
            width={500}
            height={200}
            data={revenueExpenses}
            margin={{
              top: 35,
              right: 25,
              left: -10,
            }}
          >
            <Tooltip
              contentStyle={{
                color: "#F2F2F2",
                backgroundColor: "#0C0A09",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CE1C42" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#CE1C42" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CE1C42" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#CE1C42" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke="#CE1C42"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke="#CE1C42"
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* REVENUE AND PROFIT */}
      <DashboardBox style={{ gridArea: "b" }}>
        <BoxHeader
          title="Revenue and Profit"
          sideText="+4%"
          subtitle="top line represents revenue, bottom line represents profit"
        />
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 35,
              left: -10,
            }}
          >
            <Tooltip
              contentStyle={{
                color: "#F2F2F2",
                backgroundColor: "#0C0A09",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <CartesianGrid vertical={false} stroke="#41403F" />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke="#F2F2F2"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#CE1C42"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* MONTHLY REVENU */}
      <DashboardBox style={{ gridArea: "c" }}>
        <BoxHeader
          title="Monthly Revenue"
          sideText="+4%"
          subtitle="chart representing the monthly revenu"
        />
        <ResponsiveContainer width="100%" height="75%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 35,
              right: 15,
              left: -5,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CE1C42" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#CE1C42" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CE1C42" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#CE1C42" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#41403F" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />

            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
