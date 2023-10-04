import BoxHeader from "@/components/layout/BoxHeader";
import DashboardBox from "@/components/layout/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/lib/api";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productsData } = useGetProductsQuery();

  const pieColors = ["#391A1F", "#7C1B2F"];

  const operationalExpenses = useMemo(
    () =>
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => ({
          name: month.substring(0, 3),
          operationalExpenses,
          nonOperationalExpenses,
        })
      ),
    [operationalData]
  );

  const productExpenseData = useMemo(
    () =>
      productsData &&
      productsData.map(({ id, price, expense }) => ({
        id,
        price,
        expense,
      })),
    [productsData]
  );

  return (
    <>
      {/* OPERATIONAL AND NON-OPERATIONL EXPENSES */}
      <DashboardBox style={{ gridArea: "d" }}>
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 35,
              left: -10,
              bottom: 10,
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
              orientation="left"
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="nonOperationalExpenses"
              stroke="#F2F2F2"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="operationalExpenses"
              stroke="#CE1C42"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* CAMPAIGNS AND TARGETS */}
      <DashboardBox style={{ gridArea: "e", overflow: "auto" }}>
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <div className="flex justify-between items-center gap-6 pr-4 mt-2">
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10 }}
          >
            <Tooltip
              contentStyle={{
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="text-center basis-3/5">
            <h6 className="font-semibold tracking-tight">Target Sales</h6>
            <h4 className="text-xl font-semibold tracking-tight text-primary">
              83
            </h4>
            <p className="mt-2 text-[10px]">
              Finance goals of the campaign that is desired
            </p>
          </div>
          <div className="basis-3/5">
            <h6 className="font-semibold tracking-tight">Losses in Revenue</h6>
            <p className="mt-2 text-[10px]">
              Losses are down <span className="text-primary">25%</span>
            </p>
            <h6 className="font-semibold tracking-tight mt-2">Target Sales</h6>
            <p className="mt-2 text-[10px]">
              Margins are up by <span className="text-green-400">30%</span> from
              last month.
            </p>
          </div>
        </div>
      </DashboardBox>

      {/* PRODUCT PRICES VS EXPENSES */}
      <DashboardBox style={{ gridArea: "f" }}>
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              left: -10,
            }}
          >
            <CartesianGrid stroke="#41403F" />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                border: "none",
                borderRadius: "8px",
              }}
            />
            <ZAxis type="number" range={[20]} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill="#7C1B2F"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
