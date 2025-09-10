import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface StoreInfo {
  name: string;
  phone: string;
  address: string;
  workingHours: string;
  description: string;
}

interface StoreSettingsProps {
  storeInfo: StoreInfo;
  setStoreInfo: React.Dispatch<React.SetStateAction<StoreInfo>>;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ storeInfo, setStoreInfo }) => {
  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const savedStoreInfo = localStorage.getItem('storeInfo');
    if (savedStoreInfo) {
      setStoreInfo(JSON.parse(savedStoreInfo));
    }
  }, [setStoreInfo]);

  // Функция сохранения настроек
  const handleSave = () => {
    localStorage.setItem('storeInfo', JSON.stringify(storeInfo));
    // Уведомление об успешном сохранении
    alert('Настройки успешно сохранены!');
  };

  return (
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
        <Button className="w-full" onClick={handleSave}>
          <Icon name="Save" size={20} className="mr-2" />
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreSettings;