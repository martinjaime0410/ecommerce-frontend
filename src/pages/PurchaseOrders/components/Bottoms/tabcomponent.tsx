import PODetailsBottom from '@/components/PurchaseOrder/Details';
import PoItemHistoryModal from '@/components/PurchaseOrder/History';
import ItemsManagement from '@/components/PurchaseOrder/Items';
import { useModel } from '@umijs/max';
import type { RadioChangeEvent } from 'antd';
import { Card, Radio, Space } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';

interface ITabComponent {
  POProductItems: any[];
}

const TabComponent: FC<ITabComponent> = ({ POProductItems }) => {
  const [selectedMode, setSelectedMode] = useState('items');
  const { selectedPO } = useModel('po');

  const handleChange = (e: RadioChangeEvent) => {
    setSelectedMode(e.target.value);
  };

  return (
    <>
      <div className="title-row space-between">
        <h1 className="page-title">P.O. #{selectedPO?.ponumber}</h1>
        <Radio.Group size="small" buttonStyle="solid" value={selectedMode} onChange={handleChange}>
          <Space size={HORIZONTAL_SPACE_SIZE}>
            <Radio.Button value="items">Items</Radio.Button>
            <Radio.Button value="details">Details</Radio.Button>
            <Radio.Button value="history">History</Radio.Button>
          </Space>
        </Radio.Group>
      </div>
      <Card className="content-box">
        {selectedMode === 'items' ? (
          <ItemsManagement data={POProductItems} />
        ) : selectedMode === 'details' ? (
          <PODetailsBottom />
        ) : (
          <PoItemHistoryModal />
        )}
      </Card>
    </>
  );
};

export default TabComponent;
