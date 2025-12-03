"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  getOrderStatusCount_Admin,
  getRevenueByMonths_Admin,
  getUserByMonths_Admin,
} from "@/service/AdminService";
import { ChartDataAdminType } from "@/type/ResponseType/ChartDataAdminType";
import { Book, Users, ShoppingCart, TrendingUp } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts";

const pieChartConfig = {
  count: {
    label: "Count",
  },
  paid: {
    label: "Paid",
    color: "#0088FE",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const LineChartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AreaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const AreaChartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [ordersStatusChartData, setOrdersStatusChartData] =
    React.useState<ChartDataAdminType>({
      data: [{ orderStatus: 0, count: 0 }],
      message: "",
      status: 0,
    });
  const [revenueByMonthsChartData, setRevenueByMonthsChartData] =
    React.useState<ChartDataAdminType>({
      data: [{ year: 0, month: 0, totalRevenue: 0 }],
      message: "",
      status: 0,
    });
  const [userByMonthsChartData, setUserByMonthsChartData] =
    React.useState<ChartDataAdminType>({
      data: [{ year: 0, month: 0, totalUsers: 0 }],
      message: "",
      status: 0,
    });

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = "Admin Dashboard - BookStore Management";
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const responseOrdersStatus = await getOrderStatusCount_Admin();
        setOrdersStatusChartData(responseOrdersStatus);
        const responseRevenueByMonths = await getRevenueByMonths_Admin();
        setRevenueByMonthsChartData(responseRevenueByMonths);
        const responseUserByMonths = await getUserByMonths_Admin();
        setUserByMonthsChartData(responseUserByMonths);
        console.log("Orders Status Chart Data:", responseUserByMonths);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching chart data:", error);
      }
    };
    fetchChartData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Books */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Books</CardTitle>
            <Book className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {localStorage.getItem("productsLength")}
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingCart className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {localStorage.getItem("ordersDataLength")}
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {localStorage.getItem("usersDataLength")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders status */}
      <div className="grid max-lg:grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Orders Status</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={ordersStatusChartData.data}
                  dataKey="count"
                  nameKey="orderStatus"
                  innerRadius={60}
                />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total orders for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Revenue by months */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={LineChartConfig}>
              <LineChart
                accessibilityLayer
                data={revenueByMonthsChartData.data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="totalRevenue"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <Legend />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-center gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Users by months */}
        <Card>
          <CardHeader>
            <CardTitle>User by Month</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={AreaChartConfig}>
              <AreaChart
                accessibilityLayer
                data={userByMonthsChartData.data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="totalUsers"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
