import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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

interface ProductsManagementProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsManagement: React.FC<ProductsManagementProps> = ({ products, setProducts }) => {
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
      setProducts(prev => [...prev, product]);
      setNewProduct({ name: '', description: '', price: 0, category: '', specifications: '', image: '' });
    }
  };

  const updateProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setEditingProduct(null);
    }
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleProductStock = (productId: number) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  };

  return (
    <>
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
    </>
  );
};

export default ProductsManagement;