import { OButton } from '@/components/Globals/OButton';
// import { OTable } from '@/components/Globals/OTable';
import SelectDropdown from '@/components/Globals/selectDropdown';
import TransferHistoryModal from '@/components/Modals/Inventory/TransferHistory';
import { cn, SampleSplitter } from '@/utils/components/SampleSplitter';
import { modalType } from '@/utils/helpers/types';
import { CheckCircleFilled, EditTwoTone, PlayCircleFilled } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Card, Col, Input, Row, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useResizable } from 'react-resizable-layout';
import TransferDetails from './components/RightPanel';
import { data, historyData } from './components/structure';
const { Search } = Input;

const Tcolumns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) =>
      status === 'active' ? (
        <CheckCircleFilled style={{ color: '#00FF00', fontSize: 15 }} />
      ) : (
        <PlayCircleFilled style={{ color: '#1292C6', fontSize: 15 }} />
      ),
    align: 'center',
  },
  {
    title: 'Source Warehouse',
    dataIndex: 'source_warehouse',
    key: 'source_warehouse',
  },
  {
    title: 'Order Number',
    dataIndex: 'order_number',
    key: 'order_number',
  },
  {
    title: 'FBA Shipment',
    dataIndex: 'fba_shipment',
    key: 'fba_shipment',
  },
  {
    title: 'Create Date',
    dataIndex: 'created_date',
    key: 'created_date',
  },
  {
    title: 'Closed Date',
    dataIndex: 'closed_date',
    key: 'closed_date',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    render: () => <EditTwoTone />,
    align: 'center',
  },
  {
    title: 'Sales Channel',
    dataIndex: 'sales_channel',
    key: 'sales_channel',
  },
  {
    title: 'Receiving Warehouse',
    dataIndex: 'receiving_warehouse',
    key: 'receiving_warehouse',
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Shipping',
    dataIndex: 'shipping',
    key: 'shipping',
  },
  {
    title: 'Tracking',
    dataIndex: 'tracking',
    key: 'tracking',
    render: (text) => <a>{text}</a>,
  },
];
interface ITransferManagement {
  tabButtons: React.ReactNode;
}

const TransferManagement: React.FC<ITransferManagement> = ({ tabButtons }) => {
  const { initialState } = useModel('@@initialState');
  const [currentModal, setCurrentModal] = useState<modalType>(modalType.Close);
  const [dataSource, setDataSource] = useState(data);
  const [historyDataSource, sethistoryDataSource] = useState(historyData);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const {
    isDragging: isRightDragging,
    position: RightW,
    separatorProps: rightDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 450,
    min: 300,
    reverse: true,
  });

  const showHistory = () => {
    setCurrentModal(modalType.History);
  };

  return (
    <>
      <div className="w-full flex flex-column h-screen">
        <Row style={{ marginBottom: 10 }}>
          <Col span={6} style={{ paddingLeft: 10 }}>
            {tabButtons}
          </Col>
          <Col span={18}>
            <div style={{ textAlign: 'right', marginRight: 10 }}>
              <Space size={4}>
                {/* <Select
                  options={[{ value: 'source_warehouse', label: '37 source Warehouses' }]}
                  defaultValue="source_warehouse"
                  style={{ width: '220px', textAlign: 'left' }}
                /> */}
                {/* <Select
                  options={[{ value: 'dest_warehouse', label: '37 Dest. Warehouses' }]}
                  defaultValue="dest_warehouse"
                  style={{ width: '220px', textAlign: 'left' }}
                /> */}
                {/* <Select
                  options={[{ value: 'sto_statuses', label: '7 STO Statuses' }]}
                  defaultValue="sto_statuses"
                  style={{ width: '220px', textAlign: 'left' }}
                /> */}
                <SelectDropdown
                  options={initialState?.initialData?.warehouses.map((warehouse) => ({
                    value: warehouse.id,
                    label: warehouse.name,
                  }))}
                  defaultSelectedItems={initialState?.initialData?.warehouses.map(
                    (warehouse) => warehouse.id,
                  )}
                  type="Source Warehouse"
                  style={{ width: '220px' }}
                  size={'middle'}
                />
                <SelectDropdown
                  options={initialState?.initialData?.warehouses.map((warehouse) => ({
                    value: warehouse.id,
                    label: warehouse.name,
                  }))}
                  defaultSelectedItems={initialState?.initialData?.warehouses.map(
                    (warehouse) => warehouse.id,
                  )}
                  type="Dest. Warehouse"
                  style={{ width: '220px' }}
                  size={'middle'}
                />
                <SelectDropdown
                  options={initialState?.initialData?.warehouses.map((warehouse) => ({
                    value: warehouse.id,
                    label: warehouse.name,
                  }))}
                  defaultSelectedItems={initialState?.initialData?.warehouses.map(
                    (warehouse) => warehouse.id,
                  )}
                  type="STO Statuse"
                  style={{ width: '220px' }}
                  size={'middle'}
                />
              </Space>
            </div>
          </Col>
        </Row>

        <Card style={{ borderRadius: 5, marginLeft: 10, marginRight: 10 }}>
          <Space size={4}>
            <Search
              placeholder="Enter Order#, SKU or product name..."
              onSearch={() => console.log('Search in Transfers tab on the orders module')}
              enterButton
              size="small"
              style={{ width: 300 }}
            />
            <OButton
              btnText="Receive"
              disabled={!(selectedTransfer?.status === 'pending_receiving')}
            />
            <OButton btnText="History" disabled={!selectedTransfer} onClick={showHistory} />
          </Space>

          <Table
            columns={Tcolumns}
            dataSource={dataSource}
            style={{ marginTop: 15 }}
            onRow={(record) => {
              return {
                onClick: () => {
                  if (record.key === selectedTransfer?.key) setSelectedTransfer(null);
                  else setSelectedTransfer(record);
                },
              };
            }}
            rowClassName={(record) =>
              record.key === selectedTransfer?.key ? `ant-table-row-selected` : ''
            }
          />
        </Card>
      </div>
      <SampleSplitter isDragging={isRightDragging} {...rightDragBarProps} />
      <div
        className={cn('shrink-0 contents', isRightDragging && 'dragging')}
        style={{ width: RightW }}
      >
        <div className="w-full">{selectedTransfer && <TransferDetails />}</div>
      </div>

      <TransferHistoryModal
        isOpen={currentModal === modalType.History}
        onClose={() => setCurrentModal(modalType.Close)}
        dataSource={historyDataSource}
      />
    </>
  );
};

export default TransferManagement;
