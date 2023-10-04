import DashboardBox from "@/components/layout/DashboardBox";
import { Button } from "@/components/ui/button";
import { useGetKpisQuery } from "@/lib/api";
import { useMemo, useState } from "react";
import regression, { DataPoint } from "regression";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Predictions = () => {
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );

    const regressionLine = regression.linear(formatted);
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Line": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <>
      <DashboardBox
        style={{
          margin: "0 1rem",
          height: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex justify-between my-4 mx-10 gap-4">
          <div className="">
            <h3 className="text-2xl font-semibold tracking-tight">
              Revenue and Predictions
            </h3>
            <h6 className="text-sm tracking-tight mt-2 w-2/3 md:w-full">
              charted revenue and predicted revenue on a simple linear
              regression model
            </h6>
          </div>
          <div className="pt-1">
            <Button onClick={() => setIsPredictions(!isPredictions)}>
              {isPredictions ? "Hide" : "Show"} Prediction
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              left: 20,
              right: 75,
              bottom: 40,
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
            <CartesianGrid
              vertical={false}
              stroke="#41403F"
              strokeDasharray="3 3"
            />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Month" offset={-20} position="insideBottom" />
            </XAxis>
            <YAxis
              domain={[12000, 26000]}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label
                value="Revenu in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke="#F2F2F2"
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#CE1C42"
              dot={false}
            />
            {isPredictions && (
              <Line
                strokeDasharray="5 5"
                dataKey="Predicted Line"
                stroke="#EEE4BE"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Predictions;
