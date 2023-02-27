import { OModal } from '@/components/Globals/OModal';
import { Select, Input, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import type { TabsProps } from 'antd';
import BasicInfoTab from '@/pages/Products/components/MainPanel/Modals/Tabs/BasicInfo';
import GalleryTab from '@/pages/Products/components/MainPanel/Modals/Tabs/Gallery';
import VendorProductTab from '@/pages/Products/components/MainPanel/Modals/Tabs/VendorProducts';
import BundledItemsTab from '@/pages/Products/components/MainPanel/Modals/Tabs/BundledItems';

interface IBundleKitModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface DataType {
  key: React.Key;
  name: string;
  quantity: string;
}

const BundleKitModal: React.FC<IBundleKitModal> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const { productList } = useModel('product');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundledTableRows, setBundledTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setStep(1);
    setSelectedProductIds([]);
    setTableData([]);
  }, [isOpen]);

  const handleContiuneClick = () => {
    if (step === 1) {
      const result = productList.filter((product) => selectedProductIds.includes(product.id));
      setSelectedProducts(result);
      setTableData(
        result.map((product) => ({
          key: product.id,
          name: product.name,
          quantity: product.quantity,
        })),
      );
    } else if (step === 2) {
      setBundledTableRows(
        selectedProducts.map((product) => ({
          id: product.id,
          masterSKU: product.master_sku,
          name: product.name,
          quantity: product.quantity,
        })),
      );
    }
    setStep(step + 1);
  };

  const handleProductSelect = (values: string[]) => {
    setSelectedProductIds(values);
  };

  const handleQuantityChange = (index, event) => {
    const products = selectedProducts;
    products[index].quantity = event.target.value;
    setSelectedProducts(products);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Bundled Product',
      dataIndex: 'name',
      width: 600,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (text, record, index) => <Input onChange={(event) => handleQuantityChange(index, event)} />,
    },
  ];

  const tabItems: TabsProps['items'] = [
    {
      key: 'tab-1',
      label: 'Basic Info',
      children: <BasicInfoTab />,
    },
    {
      key: 'tab-2',
      label: 'Gallery',
      children: <GalleryTab />,
    },
    {
      key: 'tab-3',
      label: 'Bundled Items',
      children: <BundledItemsTab tableRows={bundledTableRows} />,
    },
    {
      key: 'tab-4',
      label: 'Vendor Products',
      children: <VendorProductTab />,
    },
    {
      key: 'tab-5',
      label: 'Fields',
      children: '',
    },
  ];

  return (
    <OModal
      title="New Bundle/Kit"
      helpLink="/help/products/create/bundlekit"
      width={800}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Cancel',
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: step == 3 ? 'Save' : 'Continue',
          onClick: step === 3 ? onSave : handleContiuneClick,
        },
      ]}
    >
      <>
        {step === 1 && (
          <div style={{ height: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>Select Core Products to Bundle</h2>
            </div>
            <Select
              mode="multiple"
              size="small"
              style={{ width: '100%' }}
              placeholder="Searcy by Master SKU or Name..."
              onChange={handleProductSelect}
              options={productList.map((product) => ({
                value: product.id,
                label: `${product.master_sku} - ${product.name}`,
              }))}
              filterOption={(input, option) => option.label.includes(input)}
            />
          </div>
        )}
        {step === 2 && (
          <div style={{ height: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>Provide Quantity of each Bundled Product</h2>
            </div>
            <Table columns={columns} dataSource={tableData} />
          </div>
        )}
        {step === 3 && (
          <div>
            <Tabs defaultActiveKey="1" items={tabItems} />
          </div>
        )}
      </>
    </OModal>
  );
};

export default BundleKitModal;