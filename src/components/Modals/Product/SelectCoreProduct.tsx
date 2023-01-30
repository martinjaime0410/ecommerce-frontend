import { OModal } from '@/components/Globals/OModal';
import { Select } from 'antd';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import { productType } from '@/utils/helpers/types';

interface ISelectCoreProduct {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const SelectCoreProduct: React.FC<ISelectCoreProduct> = ({ isOpen, onClose, onSave }) => {
  const { productList, setSelectedProducts } = useModel('product');
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    setSelectedProductIds([]);
  }, [isOpen]);

  const handleProductSelect = (values: string[]) => {
    setSelectedProductIds(values);
  };

  const handleSave = () => {
    setSelectedProducts(productList.filter((product) => selectedProductIds.includes(product.id)));
    onSave();
  };

  return (
    <OModal
      title="New Bundle/Kit"
      width={800}
      centered
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
          btnLabel: 'Continue',
          onClick: handleSave,
        },
      ]}
    >
      <div style={{ height: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>Select Core Products to Bundle</h2>
        </div>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Searcy by Master SKU or Name..."
          onChange={handleProductSelect}
          options={productList.map((product) => ({
            value: product.id,
            label: `${product.master_sku} - ${product.name}`,
            type: product.type,
          }))}
          filterOption={(input, option) =>
            (option.type === productType.CoreProduct || option.type === productType.Variations) &&
            option.label.includes(input)
          }
          value={selectedProductIds}
        />
      </div>
    </OModal>
  );
};

export default SelectCoreProduct;