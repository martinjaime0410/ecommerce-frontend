import { OButton } from '@/components/Globals/OButton';
import { OTable } from '@/components/Globals/OTable';
import CreateCustomerModal from '@/pages/Customers/components/Modals/CreateCustomer';
import EditHistoryModal from '@/pages/Customers/components/Modals/EditHistory';
import { cn, SampleSplitter } from '@/components/Globals/SampleSplitter';
import { modalType } from '@/utils/helpers/types';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { DragDropContainer } from 'react-drag-drop-container-typescript';
import { useResizable } from 'react-resizable-layout';
import BottomPanel from './components/Bottom';
import RightPanel from './components/RightPanel';
import SidePanel from './components/SidePanel';

const CustomerManagement: React.FC = () => {
  const { customerList, selectedCustomer, setSelectedCustomer, initialCustomerList, onGetSelectedCustomer } =
    useModel('customer');
  const [modalOpen, setModal] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

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

  const {
    isDragging: isRightDragging,
    position: RightW,
    splitterProps: rightDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 280,
    min: 50,
    reverse: true,
  });

  const Tcolumns = [
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Card ID Number',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => (
        <DragDropContainer targetKey="merge" dragData={text}>
          {text}
        </DragDropContainer>
      ),
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalsales',
      key: 'totalsales',
    },
  ];

  const prepareCustomersTableData = customerList?.map((item) => ({
    key: item.id,
    phone: item.phonenumber,
    cardNumber: item.card_number,
    name: item.name,
    address: item.address,
    orders: 1,
    totalsales: '$0.00',
  }));

  // fetch initial customer list
  useEffect(() => {
    initialCustomerList();
  }, [initialCustomerList]);

  // get selected customer
  useEffect(() => {
    if (selectedRows[0]) {
      onGetSelectedCustomer(selectedRows[0]);
    } else {
      setSelectedCustomer(null);
    }
  }, [selectedRows, onGetSelectedCustomer, setSelectedCustomer]);

  return (
    <PageContainer title={false} className={'flex flex-column overflow-hidden'}>
      <div className={'flex grow'}>
        <div className={cn('shrink-0 contents', isLeftDragging && 'dragging')} style={{ width: LeftW }}>
          <div className="w-full">
            <SidePanel />
          </div>
        </div>
        <SampleSplitter isDragging={isLeftDragging} {...leftDragBarProps} />
        <div className="w-full flex flex-column h-screen">
          <div className="horizon-content" style={{ overflow: 'scroll' }}>
            <div className="main-panel">
              <div className="title-row">
                <h1 className="page-title">Customers</h1>
              </div>
              <Card className="content-box">
                <Space size={HORIZONTAL_SPACE_SIZE} className="button-row">
                  <OButton btnText="Merge" onClick={() => setModal(modalType.Merge)} />
                  <OButton btnText="History" disabled={!selectedCustomer} onClick={() => setModal(modalType.History)} />
                  <OButton btnText="New Customers" onClick={() => setModal(modalType.New)} />
                </Space>
                <OTable
                  columns={Tcolumns}
                  rows={prepareCustomersTableData}
                  type="radio"
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              </Card>
            </div>
            <SampleSplitter isDragging={isRightDragging} {...rightDragBarProps} />
            <Row>
              <div className={cn('shrink-0 contents', isLeftDragging && 'dragging')} style={{ width: RightW }}>
                <div className="">
                  <RightPanel />
                </div>
              </div>
            </Row>
          </div>

          <SampleSplitter dir={'horizontal'} isDragging={isBottomDragging} {...bottomDragBarProps} />
          <div className={cn('shrink-0 contents', isBottomDragging && 'dragging')} style={{ height: bottomH }}>
            <div className="w-full">
              <BottomPanel />
            </div>
          </div>
        </div>
      </div>

      <EditHistoryModal
        isOpen={modalOpen === modalType.History}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
      />

      <CreateCustomerModal isOpen={modalOpen === modalType.New} onClose={() => setModal(modalType.Close)} />
    </PageContainer>
  );
};

export default CustomerManagement;