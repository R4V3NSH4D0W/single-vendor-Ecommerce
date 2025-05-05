"use client";

import {
  BarChart as ReBarChart,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
} from "recharts";

interface ChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function CustomBarChart({ data }: ChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CustomLineChart({ data }: ChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface CohortChartProps {
  data: Array<{
    cohortMonth: string;
    totalUsers: number;
    retentionRate: number;
  }>;
}

export function CohortChart({ data }: CohortChartProps) {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="cohortMonth"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            }
          />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) =>
              name === "retentionRate" ? `${value.toFixed(2)}%` : value
            }
          />
          <Legend />
          <Bar dataKey="totalUsers" fill="#8884d8" name="Total Users" />
          <Bar dataKey="retentionRate" fill="#82ca9d" name="Retention Rate" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
