import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import ProductsManagement from '@/components/admin/ProductsManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import StoreSettings from '@/components/admin/StoreSettings';

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

interface StoreInfo {
  name: string;
  phone: string;
  address: string;
  workingHours: string;
  description: string;
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

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Подшипник барабана стиральной машины',
      description: 'Высокопрочный подшипник для стиральных машин различных марок. Диаметр 35мм, нержавеющая сталь.',
      price: 2500,
      category: 'Стиральные машины',
      image: '/img/d8efcfc2-6ee3-4308-bc87-512364ea7177.jpg',
      specifications: ['Диаметр: 35мм', 'Материал: нержавеющая сталь', 'Тип: шариковый', 'Производитель: SKF'],
      inStock: true
    },
    {
      id: 2,
      name: 'Компрессор холодильника',
      description: 'Компрессор для бытовых холодильников мощностью 150W. Совместим с большинством моделей.',
      price: 8900,
      category: 'Холодильники',
      image: '/img/6fa180ed-d126-4638-addd-7a969d92e7ae.jpg',
      specifications: ['Мощность: 150W', 'Хладагент: R134a', 'Напряжение: 220V', 'Производитель: Embraco'],
      inStock: true
    }
  ]);

  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: 'TechParts Store',
    phone: '+7 (495) 123-45-67',
    address: 'г. Москва, ул. Техническая, д. 15',
    workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00',
    description: 'Профессиональные запчасти для бытовой техники. Гарантия качества и быстрая доставка.'
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      productIds: [1],
      customerName: 'Иванов Петр Сергеевич',
      customerPhone: '+7 (910) 123-45-67',
      customerAddress: 'г. Москва, ул. Ленина, д. 25, кв. 42',
      totalPrice: 2500,
      status: 'shipped',
      deliveryService: 'СДЭК',
      trackingNumber: 'CD123456789RU',
      orderDate: '2024-09-08 14:30',
      shippedDate: '2024-09-09 10:15',
      deliveryDate: '2024-09-11'
    },
    {
      id: 1002,
      productIds: [2],
      customerName: 'Сидорова Мария Ивановна',
      customerPhone: '+7 (985) 987-65-43',
      customerAddress: 'г. СПб, пр. Невский, д. 120, кв. 8',
      totalPrice: 8900,
      status: 'processing',
      deliveryService: 'Почта России',
      trackingNumber: 'RA456789123RU',
      orderDate: '2024-09-09 16:45'
    },
    {
      id: 1003,
      productIds: [1, 2],
      customerName: 'Козлов Александр Петрович',
      customerPhone: '+7 (903) 555-11-22',
      customerAddress: 'г. Казань, ул. Баумана, д. 45',
      totalPrice: 11400,
      status: 'delivered',
      deliveryService: 'Boxberry',
      trackingNumber: 'BB987654321RU',
      orderDate: '2024-09-05 11:20',
      shippedDate: '2024-09-06 09:30',
      deliveryDate: '2024-09-08'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-75">
                <Icon name="ArrowLeft" size={24} className="text-gray-600" />
                <span className="text-sm text-gray-600">Вернуться в магазин</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Управление товарами</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="store">Настройки магазина</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <ProductsManagement products={products} setProducts={setProducts} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersManagement orders={orders} setOrders={setOrders} products={products} />
          </TabsContent>

          <TabsContent value="store" className="space-y-6">
            <StoreSettings storeInfo={storeInfo} setStoreInfo={setStoreInfo} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;