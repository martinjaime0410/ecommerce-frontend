import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { modalType } from '@/utils/helpers/types';
import SidePanel from './components/SidePanel/sidePanel';
import VendorModal from '@/components/Modals/PurchaseOrder/VendorModal';
import AddNewPOModal from '@/components/Modals/PurchaseOrder/AddNewPOModal';
import { Table1DemoColumns } from '@/data';

import { SampleSplitter, cn } from '@/utils/components/SampleSplitter';
import { useResizable } from 'react-resizable-layout';
import TabComponent from './components/Bottoms/tabcomponent';
import { useModel } from 'umi';
import { OTable } from '@/components/Globals/OTable';
import type { IOButton } from '@/components/Globals/OButton';
import { OButton } from '@/components/Globals/OButton';
const vendorModalLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CustomerManagement: React.FC = () => {
  const {
    poList,
    initialSelectedPO,
    handleSelectedPOChange,
    getPoTotalCost,
    getTotalUnitQuantity,
    setSelectedPO,
  } = useModel('po');
  const { initialMilestonesList } = useModel('milestones');
  const { initialShippingTermList } = useModel('shippingTerm');
  const { selectedPOStatus } = useModel('poStatus');
  const { initialState } = useModel('@@initialState');

  const [vendorModal, setVendorModal] = useState('');
  const [newPOModal, setNewPOModal] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [form] = Form.useForm();

  const {
    isDragging: isBottomDragging,
    position: bottomH,
    splitterProps: bottomDragBarProps,
  } = useResizable({
    axis: 'y',
    initial: 200,
    min: 50,
    reverse: true,
  });

  const {
    isDragging: isLeftDragging,
    position: LeftW,
    splitterProps: leftDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 220,
    min: 50,
  });

  const onVendorModalNext = () => {
    setVendorModal(modalType.Close);
    if (form.getFieldValue('vendor')) {
      setNewPOModal(modalType.New);
    }
  };

  const onVendorModalCancel = () => {
    setVendorModal(modalType.Close);
  };

  const onVendorChange = (value: string) => {
    handleSelectedPOChange('fromVendor', value);
    // Need to use the local storage's vendors
    // const itemValue = initialState?.initialData?.vendors?.find((item) => item.id == value)?.name;
    form.setFieldsValue({
      vendor: value,
    });
  };

  const handleNewPOModalOpen = () => {
    initialSelectedPO();
    setVendorModal(modalType.New);
  };

  const actionButtons: IOButton[] = [
    {
      onClick: () => console.log('Vendor'),
      btnText: 'Print',
    },
    {
      onClick: () => console.log('Authorized'),
      btnText: 'Authorize',
      hidden:
        (selectedPOStatus?.key !== '0' && selectedPOStatus?.key !== '1') ||
        !selectedPOStatus?.selectedWarehouse,
    },
    {
      onClick: () => console.log('Canceled'),
      btnText: 'Cancel',
    },
    {
      onClick: handleNewPOModalOpen,
      btnText: 'New P.O.',
    },
    {
      onClick: () => console.log('Restore P.O.'),
      btnText: 'Restore P.O.',
      hidden: selectedPOStatus?.key !== '10' || !selectedPOStatus?.selectedWarehouse,
    },
    {
      onClick: () => console.log('Import/Export'),
      btnText: 'Import/Export',
    },
  ];

  // get selected po product items
  const selectedFullPO = poList.find((poItem) => poItem.key === selectedRows[0]);
  const POProductItems = selectedFullPO ? selectedFullPO.poItems : [];

  // prepare po list table rows
  const poListTableRows = poList.map((poItem) => ({
    ...poItem,
    totalCost: getPoTotalCost(poItem),
    totalUnits: getTotalUnitQuantity(poItem),
  }));

  useEffect(() => {
    initialMilestonesList();
    initialShippingTermList();
  }, [initialMilestonesList, initialShippingTermList]);

  useEffect(() => {
    if (selectedRows && selectedRows[0]) {
      const _selectedPo = poList.find((poItem) => poItem.key === selectedRows[0]);
      setSelectedPO(_selectedPo);
    }
  }, [selectedRows, poList, setSelectedPO]);

  return (
    <PageContainer title={false} className={'flex flex-column overflow-hidden'}>
      <div className={'flex grow'}>
        <div
          className={cn('shrink-0 contents', isLeftDragging && 'dragging')}
          style={{ width: LeftW }}
        >
          <div className="w-full">
            <SidePanel />
          </div>
        </div>
        <SampleSplitter isDragging={isLeftDragging} {...leftDragBarProps} />
        <div className="w-full flex flex-column h-screen">
          <div className="horizon-content">
            <Card size="small" className="horizon-card">
              <p>Purchase Orders :: Awaiting Authorization</p>
              <Space size={3} style={{ marginBottom: 10 }}>
                {actionButtons.map((btn, index) => (
                  <OButton key={index} {...btn} />
                ))}
              </Space>
              <OTable
                columns={Table1DemoColumns}
                rows={poListTableRows}
                type={'radio'}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </Card>
          </div>
          <SampleSplitter
            dir={'horizontal'}
            isDragging={isBottomDragging}
            {...bottomDragBarProps}
          />
          <div
            className={cn('shrink-0 contents', isBottomDragging && 'dragging')}
            style={{ height: bottomH }}
          >
            <div className="w-full">
              {selectedRows.length == 1 && <TabComponent POProductItems={POProductItems} />}
            </div>
          </div>
        </div>
      </div>

      <VendorModal
        vendorModal={vendorModal}
        onVendorModalNext={onVendorModalNext}
        onVendorModalCancel={onVendorModalCancel}
        vendorModalLayout={vendorModalLayout}
        form={form}
        onVendorChange={onVendorChange}
      />
      <AddNewPOModal newPOModal={newPOModal} setNewPOModal={setNewPOModal} />
    </PageContainer>
  );
};

export default CustomerManagement;
