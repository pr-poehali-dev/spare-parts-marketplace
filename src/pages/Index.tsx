import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ username: '', password: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: 0, category: '', specifications: ''
  });

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
    },
    {
      id: 3,
      name: 'Магнетрон микроволновой печи',
      description: 'Магнетрон мощностью 800W для микроволновых печей. Универсальная модель.',
      price: 3200,
      category: 'Микроволновые печи',
      image: '/img/76c66b7c-4c47-43c8-ac12-18b95e428657.jpg',
      specifications: ['Мощность: 800W', 'Частота: 2.45GHz', 'Антенна: керамическая', 'Производитель: LG'],
      inStock: false
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAdminLogin = () => {
    if (adminLogin.username === 'admin' && adminLogin.password === 'admin123') {
      setIsAdminOpen(false);
      window.location.href = '/admin';
    } else {
      alert('Неверные данные для входа');
    }
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        image: '/placeholder.svg',
        specifications: newProduct.specifications.split(',').map(s => s.trim()),
        inStock: true
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: 0, category: '', specifications: '' });
    }
  };

  const removeProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Settings" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">TechParts Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => cart.length > 0 && setIsCartOpen(true)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              <Button variant="secondary" onClick={() => setIsAdminOpen(true)}>
                <Icon name="User" size={20} className="mr-2" />
                Администратор
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Поиск запчастей для бытовой техники</h2>
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Введите название запчасти, модель техники или артикул..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? 'В наличии' : 'Нет в наличии'}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{product.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Технические характеристики:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center">
                        <Icon name="Wrench" size={12} className="mr-2 text-gray-400" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <Button 
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="min-w-[120px]"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Товары не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </main>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Корзина покупок</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                  <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
            {cart.length === 0 ? (
              <p className="text-center py-8 text-gray-500">Корзина пуста</p>
            ) : (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTotalPrice().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <Button className="w-full" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Dialog */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Панель администратора</DialogTitle>
          </DialogHeader>
          {!isAdminLoggedIn ? (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Логин"
                value={adminLogin.username}
                onChange={(e) => setAdminLogin(prev => ({ ...prev, username: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={adminLogin.password}
                onChange={(e) => setAdminLogin(prev => ({ ...prev, password: e.target.value }))}
              />
              <Button onClick={handleAdminLogin} className="w-full">
                Войти
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Демо: логин "admin", пароль "admin123"
              </p>
            </div>
          ) : (
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Добавить товар</TabsTrigger>
                <TabsTrigger value="manage">Управление товарами</TabsTrigger>
              </TabsList>
              <TabsContent value="add" className="space-y-4">
                <Input
                  placeholder="Название товара"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Описание"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Цена"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                />
                <Input
                  placeholder="Категория"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                />
                <Input
                  placeholder="Характеристики (через запятую)"
                  value={newProduct.specifications}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, specifications: e.target.value }))}
                />
                <Button onClick={addProduct} className="w-full">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
              </TabsContent>
              <TabsContent value="manage" className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Button variant="destructive" onClick={() => removeProduct(product.id)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;