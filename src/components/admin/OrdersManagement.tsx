import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  specifications: string[];
  inStock: boolean;
}

interface Order {
  id: number;
  productIds: number[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  deliveryService: string;
  trackingNumber: string;
  orderDate: string;
  shippedDate?: string;
  deliveryDate?: string;
}

interface OrdersManagementProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  products: Product[];
}

const OrdersManagement: React.FC<OrdersManagementProps> = ({ orders, setOrders, products }) => {
  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status };
        if (status === 'shipped' && !order.shippedDate) {
          updatedOrder.shippedDate = new Date().toISOString().slice(0, 16).replace('T', ' ');
        }
        if (status === 'delivered' && !order.deliveryDate) {
          updatedOrder.deliveryDate = new Date().toISOString().slice(0, 10);
        }
        return updatedOrder;
      }
      return order;
    }));
  };

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'shipped': return 'outline';
      case 'delivered': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'processing': return 'Обрабатывается';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      default: return status;
    }
  };

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Товар #${productId}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="ShoppingBag" size={24} className="mr-2" />
          Заказы клиентов
        </CardTitle>
        <CardDescription>
          Управляйте заказами, отслеживайте доставку и обновляйте статусы
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>№ Заказа</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Товары</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Доставка</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {order.productIds.map(id => (
                      <p key={id} className="text-sm">{getProductName(id)}</p>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-bold">
                  {order.totalPrice.toLocaleString('ru-RU')} ₽
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.deliveryService}</p>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-600">
                        Трек: {order.trackingNumber}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Заказ: {order.orderDate}
                    </p>
                    {order.shippedDate && (
                      <p className="text-xs text-gray-500">
                        Отправлен: {order.shippedDate}
                      </p>
                    )}
                    {order.deliveryDate && (
                      <p className="text-xs text-green-600">
                        Доставлен: {order.deliveryDate}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value: Order['status']) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="processing">Обрабатывается</SelectItem>
                      <SelectItem value="shipped">Отправлен</SelectItem>
                      <SelectItem value="delivered">Доставлен</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersManagement;