export type ChartDataAdminType = {
  message: string;
  status: number;
  data: {
    count?: number;
    year?: number;
    month?: number;
    totalRevenue?: number;
    orderStatus?: number;
    totalUsers?: number;
  }[];
};
