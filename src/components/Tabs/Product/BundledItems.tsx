import { OButton } from '@/components/Globals/OButton';
import AddCoreProductModal from '@/pages/Products/components/Modals/AddCoreProduct';
import { modalType } from '@/utils/helpers/types';
import { useModel } from '@umijs/max';
import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';

interface IBundleItems {}

const BundledItems: React.FC<IBundleItems> = () => {
  const { selectedProducts } = useModel('product');
  const [modal, setModal] = useState('');
  const [coreProductList, setCoreProductList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buttonType, setButtonType] = useState('');

  useEffect(() => {
    setCoreProductList(
      selectedProducts.map((product) => ({
        id: product.id,
        masterSKU: product.master_sku,
        name: product.name,
        quantity: product.quantity,
      })),
    );
  }, [selectedProducts]);

  const handleAddCoreProductClick = () => {
    setButtonType('add');
    setModal(modalType.AddCoreProduct);
  };

  const handleEditCoreProductClick = () => {
    setButtonType('edit');
    setModal(modalType.AddCoreProduct);
  };

  const handleRowClick = (record) => {
    setSelectedItem(record.id);
  };

  const handleRemoveClick = () => {
    setCoreProductList(coreProductList.filter((product) => product.id !== selectedItem));
  };

  const tableColumns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'MASTER SKU',
      dataIndex: 'masterSKU',
      key: 'masterSKU',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <>
      <h3>Manage cord products and their respective quantities within this bundle/kit</h3>
      <Space size={4} style={{ marginBottom: 5 }}>
        <OButton btnText="Add Core Product" onClick={handleAddCoreProductClick} />
        <OButton
          btnText="Edit Quantity"
          onClick={handleEditCoreProductClick}
          disabled={!selectedItem}
        />
        <OButton btnText="Remove" onClick={handleRemoveClick} disabled={!selectedItem} />
      </Space>
      <Table
        columns={tableColumns}
        dataSource={coreProductList}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record), // click row
          };
        }}
        rowClassName={(record) =>
          record.id === selectedItem ? `data-row active-row pb-3` : 'data-row'
        }
      />

      <AddCoreProductModal
        isOpen={modal == modalType.AddCoreProduct}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
        coreProductList={coreProductList}
        setCoreProductList={setCoreProductList}
        selectedItemKey={selectedItem}
        setSelectedItemKey={setSelectedItem}
        type={buttonType}
      />
    </>
  );
};

export default BundledItems;
