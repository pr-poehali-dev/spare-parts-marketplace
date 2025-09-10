import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

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

  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: 0, category: '', specifications: '', image: ''
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const addProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        image: newProduct.image || '/placeholder.svg',
        specifications: newProduct.specifications.split(',').map(s => s.trim()),
        inStock: true
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: 0, category: '', specifications: '', image: '' });
    }
  };

  const updateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setEditingProduct(null);
    }
  };

  const deleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const toggleProductStock = (productId: number) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(orders.map(order => {
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

          {/* Products Management */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Package" size={24} className="mr-2" />
                  Управление товарами
                </CardTitle>
                <CardDescription>
                  Добавляйте, редактируйте и управляйте товарами в вашем магазине
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add New Product */}
                <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold">Добавить новый товар</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Название товара"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Цена (₽)"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Категория"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    />
                    <Input
                      placeholder="URL изображения"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                    />
                  </div>
                  <Textarea
                    placeholder="Описание товара"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Input
                    placeholder="Технические характеристики (через запятую)"
                    value={newProduct.specifications}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, specifications: e.target.value }))}
                  />
                  <Button onClick={addProduct} className="w-full">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить товар
                  </Button>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Список товаров</h3>
                  {products.map((product) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{product.name}</h4>
                            <Badge 
                              variant={product.inStock ? "default" : "destructive"}
                              className="cursor-pointer"
                              onClick={() => toggleProductStock(product.id)}
                            >
                              {product.inStock ? 'В наличии' : 'Нет в наличии'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                          <p className="text-lg font-bold text-primary mt-2">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-6">
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
          </TabsContent>

          {/* Store Settings */}
          <TabsContent value="store" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Store" size={24} className="mr-2" />
                  Информация о магазине
                </CardTitle>
                <CardDescription>
                  Управляйте основной информацией о вашем магазине
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название магазина</label>
                    <Input
                      value={storeInfo.name}
                      onChange={(e) => setStoreInfo(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input
                      value={storeInfo.phone}
                      onChange={(e) => setStoreInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Адрес</label>
                  <Input
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Режим работы</label>
                  <Input
                    value={storeInfo.workingHours}
                    onChange={(e) => setStoreInfo(prev => ({ ...prev, workingHours: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Описание магазина</label>
                  <Textarea
                    value={storeInfo.description}
                    onChange={(e) => setStoreInfo(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <Icon name="Save" size={20} className="mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Редактировать товар</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Название товара"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Цена"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
                />
                <Input
                  placeholder="Категория"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct(prev => prev ? { ...prev, category: e.target.value } : null)}
                />
              </div>
              <Textarea
                placeholder="Описание"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
              <div className="flex space-x-2">
                <Button onClick={updateProduct} className="flex-1">
                  <Icon name="Save" size={20} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)} className="flex-1">
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;