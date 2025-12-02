import { OrdersTable } from "@/components/admin/OrdersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable />
        </CardContent>
      </Card>
    </div>
  );
}
