import DashboardBox from "@/components/layout/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/lib/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BoxHeader from "@/components/layout/BoxHeader";
import { useMemo } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Progress } from "@/components/ui/progress";

const Row3 = () => {
  const { data: transactionsData } = useGetTransactionsQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();

  const pieColors = ["#391A1F", "#7C1B2F"];

  const pieChartData = useMemo(
    () =>
      kpiData &&
      kpiData[0].totalExpenses &&
      Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => [
        {
          name: key,
          value,
        },
        {
          name: `${key} of Total`,
          value: kpiData[0].totalExpenses - value,
        },
      ]),
    [kpiData]
  );

  return (
    <>
      {/* PRODUCT LIST */}
      <DashboardBox style={{ gridArea: "g" }}>
        <BoxHeader
          title="List of Products"
          sideText={`${productsData?.length} products`}
        />
        <div className="h-0">
          <Table>
            <TableCaption>A list of recent products.</TableCaption>
            <TableHeader>
              <TableRow className="border-secondary">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Expense</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsData?.map(({ id, expense, price }) => (
                <TableRow key={id} className="border-secondary">
                  <TableCell className="font-medium ">{id}</TableCell>
                  <TableCell>{expense}</TableCell>
                  <TableCell>{price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardBox>

      {/* RECENT ORDERS */}
      <DashboardBox style={{ gridArea: "h" }}>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionsData?.length} products`}
        />
        <div className="h-0">
          <Table>
            <TableCaption>A list of recent orders.</TableCaption>
            <TableHeader>
              <TableRow className="border-secondary">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData?.map(({ id, buyer, amount, productIds }) => (
                <TableRow key={id} className="border-secondary">
                  <TableCell className="font-medium ">{id}</TableCell>
                  <TableCell>{buyer}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{productIds.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardBox>

      {/* EXPENSE BREAKDOWN */}
      <DashboardBox style={{ gridArea: "i" }}>
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <div className="flex items-center justify-between gap-2 text-center">
          {pieChartData?.map((data, i) => (
            <div key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <h5>{data[0].name}</h5>
            </div>
          ))}
        </div>
      </DashboardBox>

      {/* OVEALL SUMMARY */}
      <DashboardBox style={{ gridArea: "j" }}>
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Progress value={33} className="mx-4 w-4/5 mt-2" />
        <h6 className="m-4 text-sm">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </h6>
      </DashboardBox>
    </>
  );
};

export default Row3;
