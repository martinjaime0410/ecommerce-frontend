import { OButton } from '@/components/Globals/OButton';
import { OModal } from '@/components/Globals/OModal';
import type { IOSelectOption } from '@/components/Globals/OSelect';
import { EditableTable } from '@/utils/components/EditableTable';
import { CloseOutlined } from '@ant-design/icons';
import { uuidv4 } from '@antv/xflow-core';
import { useModel } from '@umijs/max';
import { Form, Input, Select, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

const unitMeasureOptions: IOSelectOption[] = [
  {
    text: 'Each',
    value: '1',
  },
  {
    text: 'Item 2',
    value: '2',
  },
];

const buyerOptions = [
  {
    value: 1,
    label: 'Buyer1',
  },
  {
    value: 2,
    label: 'Buyer2',
  },
];

interface IAddNewItemModal {
  isOpen: boolean;
  poNumber: string;
  items: any[];
  onSave: (items: any[]) => void;
  onCancel: () => void;
}

const AddNewItemModal: React.FC<IAddNewItemModal> = ({ isOpen, poNumber, items, onSave, onCancel }) => {
  const { productList } = useModel('product');
  const [form] = Form.useForm();
  const [poItems, setPoItems] = useState([]);

  const productOptions = useMemo(() => productList.map((item) => ({ value: item.id, label: item.name })), [productList]);

  const AddNewItemTableColumns = [
    {
      title: '',
      key: 'delete',
      dataIndex: 'key',
      render: (id) => (
        <span onClick={() => setPoItems((prev) => prev.filter((item) => item.id !== id))}>
          <CloseOutlined style={{ color: 'blue' }} />
        </span>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      editable: true,
      options: productOptions,
    },
    {
      title: 'Vendor SKU',
      dataIndex: 'vendorSku',
      key: 'vendorSku',
      editable: true,
    },
    {
      title: 'Buyer.',
      dataIndex: 'buyer',
      key: 'buyer',
      editable: true,
      options: buyerOptions,
    },
    {
      title: 'Qty.',
      dataIndex: 'quantity',
      key: 'quantity',
      editable: true,
    },
    {
      title: 'Unit of Measure',
      dataIndex: 'unitMeasure',
      key: 'unitMeasure',
      editable: true,
    },
    {
      title: 'Total Unit Qty.',
      dataIndex: 'totalUnitqQuantity',
      key: 'totalUnitqQuantity',
      editable: true,
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unitCost',
      key: 'unitCost',
      editable: true,
    },
    {
      title: 'Discount Type',
      dataIndex: 'discountType',
      key: 'discountType',
      editable: true,
      options: [{ value: '$', label: '$' }],
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      editable: true,
    },
  ];

  const tableRows = useMemo(
    () =>
      poItems.map((item) => ({
        key: item.id,
        product: item.product?.name,
        vendorSku: item.product?.vendor_skus,
        buyer: item.product?.buyer,
        quantity: item.quantity,
        unitMeasure: item.unitMeasure,
        totalUnitqQuantity: item.totalUnitqQuantity,
        unitCost: item.unitCost,
        discountType: item.discountType,
        discount: item.discount,
      })),
    [poItems],
  );

  useEffect(() => {
    setPoItems(items);
  }, [isOpen]);

  const handleAdd = () => {
    form.validateFields().then((values) =>
      setPoItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          ...values,
          product: productList.find((item) => item.id === values.product),
          discountType: '$',
          discount: 1,
          status: '1',
        },
      ]),
    );
  };

  const handleItemSave = (index, name, value) => {
    setPoItems((prev) =>
      prev.map((item) =>
        item.id === index
          ? name === 'product'
            ? { ...item, product: productList.find((product) => product.id === value) }
            : name === 'buyer'
            ? {
                ...item,
                product: {
                  ...item.product,
                  buyer: buyerOptions.find((buyer) => buyer.value === value).label,
                },
              }
            : { ...item, [name]: value }
          : item,
      ),
    );
  };

  const handleSave = () => {
    onSave(poItems);
  };

  return (
    <OModal
      title={`Add Items To P.O. #${poNumber}`}
      helpLink=""
      width={1000}
      isOpen={isOpen}
      handleCancel={onCancel}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Cancel',
          onClick: onCancel,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: 'Save',
          onClick: handleSave,
        },
      ]}
    >
      <>
        <Form form={form}>
          <Space size={HORIZONTAL_SPACE_SIZE} className="button-row">
            <Form.Item name="product">
              <Select placeholder="Select a product..." options={productOptions} onChange={() => {}} style={{ width: 250 }} />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input type="number" style={{ width: 70 }} min={1} />
            </Form.Item>
            <Form.Item label="Unit of measure" name="unitMeasure">
              <Select options={unitMeasureOptions} onChange={() => {}} style={{ width: 120 }} />
            </Form.Item>
            <OButton btnText={'Add'} size="large" onClick={handleAdd} />
          </Space>
        </Form>
        <EditableTable columns={AddNewItemTableColumns} dataSource={tableRows} pagination={false} handleSave={handleItemSave} />
      </>
    </OModal>
  );
};

export default AddNewItemModal;
