import { OButton } from '@/components/Globals/OButton';
import type { IOButton } from '@/components/Globals/OButton';
import { OTable } from '@/components/Globals/OTable';
import ImportExportSummaryModal from '@/components/Modals/ImportExportSummary';
import ManualOrderModal from './Modals/ManualOrder';
import {
  BorderHorizontalOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DownOutlined,
  ExclamationCircleFilled,
  FieldTimeOutlined,
  FileFilled,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  GlobalOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RetweetOutlined,
  StopOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Button, Badge, Card, Space, Dropdown, Modal } from 'antd';
import EditOrderModal from './Modals/EditOrder';
import CancelOrderModal from './Modals/CancelOrder';
import RestoreOrderModal from './Modals/RestoreOrder';
import ImportOrderModal from './Modals/ImportOrder';
import ImportOrderShipmentModal from './Modals/ImportOrderShipment';
import ShipmentImportMappingsModal from './Modals/ShipmentImportMappings';
import NewShipmentImportMappingsModal from './Modals/NewShipmentImportMappings';
import ExportOrderModal from './Modals/ExportOrder';
import OrderExportSettingsModal from './Modals/OrderExportSettings';
import ExportQueueOrderModal from './Modals/ExportQueueOrder';
import OrderImportSettingsModal from './Modals/OrderImportSettings';
import AddImportSettingsModal from './Modals/AddImportSettings';
import AddExportSettingsModal from './Modals/AddExportSettings';
import SelectOrderColumnsModal from './Modals/SelectOrderColumns';
import SplitOrderModal from './Modals/SplitOrder';
import DuplicateOrderModal from './Modals/DuplicateOrder';
import { modalType } from '@/utils/helpers/types';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useModel } from '@umijs/max';
import moment from 'moment';
import { uuidv4 } from '@antv/xflow-core';

interface IMainPanel {
  selectedRows: any[];
  setSelectedRows: (value: any) => void;
}

const { confirm } = Modal;

const defaultShowColumns = [
  'Channel',
  'Order Number',
  'Labels',
  'Notes',
  'Order Date',
  'Date Paid',
  'Age',
  'Recipient',
  'Order Total',
  'Items',
  'Item Names',
];

const defaultOrderTableColumns = [
  {
    title: 'Order Number',
    dataIndex: 'order_number',
    key: 'order_number',
  },
  {
    title: 'Labels',
    dataIndex: 'labels',
    key: 'labels',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
  },
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    key: 'order_date',
  },
  {
    title: 'Date Paid',
    dataIndex: 'order_paid',
    key: 'order_paid',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    key: 'recipient',
  },
  {
    title: 'Order Total',
    dataIndex: 'orderTotal',
    key: 'orderTotal',
  },
  {
    title: 'Items',
    dataIndex: 'items',
    key: 'items',
  },
  {
    title: 'Item Names',
    dataIndex: 'itemNames',
    key: 'itemNames',
  },
];

const showConfirm = () => {
  confirm({
    title: 'Do you Want to Assign these items?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const MainPanel: React.FC<IMainPanel> = ({ selectedRows, setSelectedRows }) => {
  const { orderList, setOrderList, setEditableOrder, setSelectedOrders, initialOrderList } = useModel('order');
  const { userList } = useModel('user');
  const { fieldTypes } = useModel('customOrderFields');
  const { selectedOrderStatus } = useModel('orderStatus');
  const { initialState } = useModel('@@initialState');
  const { getShipmentImportExportSummary } = useModel('exportSummary');
  const [modalOpen, setModal] = useState('');
  const [showChooseColumn, setShowChooseColumn] = useState(true);
  const [showColumns, setShowColumns] = useState(defaultShowColumns);

  useEffect(() => {
    initialOrderList({
      order_status: selectedOrderStatus?.status?.id,
    });
  }, [initialOrderList, selectedOrderStatus]);

  const handleProductEdit = useCallback(
    (item: any) => {
      setEditableOrder(item);
      setModal(modalType.EditOrder);
    },
    [setEditableOrder, setModal],
  );

  const handleSelectedRows = useCallback(
    (_selectedRows = []) => {
      setSelectedRows(_selectedRows);
      const _selectedOrders = orderList.filter((item) => _selectedRows.includes(item.id));
      setSelectedOrders(_selectedOrders);
      setEditableOrder(_selectedOrders[0]);
    },
    [orderList, setSelectedRows, setSelectedOrders, setEditableOrder],
  );

  const actionButtons: IOButton[] = [
    {
      onClick: () => setModal(modalType.ExportQueueOrder),
      btnText: 'Queue',
      hidden: [6, 7].includes(selectedOrderStatus?.status.id),
    },
    {
      onClick: () => console.log('Ship'),
      btnText: 'Ship',
      hidden: [6, 7].includes(selectedOrderStatus?.status.id),
    },
    {
      btnText: (
        <Dropdown
          menu={{
            items: [
              {
                key: 'pick_list',
                label: <span> Pick List(s)</span>,
                icon: <FileOutlined />,
              },
              {
                key: 'global_picK_list',
                label: <span> Global Pick List</span>,
                icon: <FileOutlined />,
              },
              {
                key: 'packing_slip',
                label: <span>Packing Slip(s)</span>,
                icon: <FileTextOutlined />,
              },
              {
                key: 'item_label',
                label: <span>Item Label(s)</span>,
                icon: <FileOutlined />,
              },
              {
                key: 'item_label_roll',
                label: <span>Item Label(s) Roll</span>,
                icon: <FileOutlined />,
              },
              {
                key: 'label',
                label: <span>Label(s)</span>,
                icon: <FileOutlined />,
              },
              {
                key: 'custom_form',
                label: <span>Custom Form(s)</span>,
                icon: <FileOutlined />,
              },
            ],
          }}
        >
          <Button size="small">
            <Space>
              Print <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
      hidden: [6, 7].includes(selectedOrderStatus?.status.id),
    },
    {
      onClick: () => console.log('Label'),
      btnText: (
        <Dropdown
          menu={{
            items: [],
          }}
        >
          <Button size="small">
            <Space>
              Label <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
    {
      btnText: (
        <Dropdown
          menu={{
            items: [
              {
                key: 'hold_until',
                label: <span>Hold Until..</span>,
                icon: <FieldTimeOutlined />,
              },
              // In Awaiting Shipment or Pending Fulfillment
              [3, 4].includes(selectedOrderStatus?.status.id)
                ? {
                    key: 'cancel_order',
                    label: <span onClick={() => setModal(modalType.CancelOrder)}>Cancel Order</span>,
                    icon: <StopOutlined />,
                    disabled: selectedRows.length == 0,
                  }
                : null,
              {
                key: 'assign_to',
                label: <span>Assign To</span>,
                icon: <UserOutlined />,
                children:
                  userList.length > 1 &&
                  userList
                    .filter((user) => user.id !== initialState?.currentUser?.user.id)
                    .map((user) => ({
                      key: user.id,
                      label: <span onClick={showConfirm}>{user.username}</span>,
                    })),
                disabled: selectedRows.length == 0,
              },
              {
                key: 'split_order',
                label: <span onClick={() => setModal(modalType.SplitOrder)}>SplitOrder</span>,
                icon: <MinusCircleOutlined />,
                disabled: selectedRows.length !== 1,
              },
              {
                key: 'mark_shipped',
                label: <span>{`Mark 'Shipped'`}</span>,
                icon: <CheckCircleOutlined />,
              },
              {
                key: 'duplicate_order',
                label: <span onClick={() => setModal(modalType.DuplicateOrder)}>Duplicate Order</span>,
                icon: <PlusCircleOutlined />,
              },
              // {
              //   key: '7',
              //   label: (<span> Restore</span>),
              //   icon: <RedoOutlined />
              // },
            ],
          }}
        >
          <Button size="small">
            <Space>
              Edit <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
      hidden: [7].includes(selectedOrderStatus?.status.id),
    },
    {
      onClick: () => setModal(modalType.RestoreOrder),
      btnText: 'Restore',
      hidden:
        ![6, 7].includes(selectedOrderStatus?.status.id) ||
        ([6, 7].includes(selectedOrderStatus?.status.id) && selectedRows.length < 1),
    },
    {
      onClick: () => console.log('Merge'),
      btnText: 'Merge',
      hidden: [6, 7].includes(selectedOrderStatus?.status.id),
    },
    {
      btnText: (
        <Dropdown
          menu={{
            items: [
              {
                key: '3',
                label: (
                  <span
                    onClick={() => {
                      setModal(modalType.ManualOrder);
                    }}
                  >
                    Manual Orders
                  </span>
                ),
                icon: <GlobalOutlined />,
              },
            ],
          }}
        >
          <Button size="small">
            <Space>
              New Order <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
    {
      onClick: () => console.log('Import/Export'),
      btnText: (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: <span onClick={() => setModal(modalType.ImportOrder)}>Import Orders</span>,
                icon: <VerticalAlignTopOutlined />,
              },
              {
                key: '2',
                label: <span onClick={() => setModal(modalType.ImportOrderShipments)}>Import Shipments</span>,
                icon: <VerticalAlignTopOutlined />,
              },
              {
                type: 'divider',
              },
              {
                key: '4',
                label: <span onClick={() => setModal(modalType.ExportOrder)}>Export Selected Orders</span>,
                icon: <VerticalAlignBottomOutlined />,
                disabled: selectedRows.length == 0,
              },
            ],
          }}
        >
          <Button size="small">
            <Space>
              Import/Export <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
  ];

  //order list table columns
  const orderTableColumns = useMemo(() => {
    const staticColumns = defaultOrderTableColumns.filter((item) => showColumns.includes(item.title));

    const customColumns = fieldTypes
      .filter((field) => field.show_on_grid && field.active)
      .map((field) => ({
        key: field.name,
        dataIndex: field.id,
        title: field.name,
      }));

    return [...staticColumns, ...customColumns];
  }, [showColumns, fieldTypes]);

  // prepare order list table rows
  const orderTableRows = useMemo(
    () =>
      orderList.map((item) => {
        item.custom_fields.forEach((field) => (item[field.field_id] = field.value));

        return {
          ...item,
          key: item.id,
          channel: (
            <span>
              <img src={item.sales_channel.icon} />
              <span>{item.sales_channel.name}</span>
            </span>
          ),
          orderTotal: `$${item.orderTotal}`,
          order_number: (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleProductEdit(item);
              }}
            >
              <FileOutlined />{' '}
              <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#5F5FFF' }}>{item.order_number}</span>
            </div>
          ),
          notes: (
            <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'space-around' }}>
              <FormOutlined style={{ color: '#5F5FFF', cursor: 'pointer' }} />
              <MessageOutlined style={{ color: '#5F5FFF', cursor: 'pointer' }} />
              <MessageOutlined style={{ color: '#5F5FFF', cursor: 'pointer', transform: 'scaleX(-1)' }} />
            </div>
          ),
          order_date: moment(item.order_date).format('Y-M-D'),
          order_paid: moment(item.order_paid).format('Y-M-D'),
          age: (
            <span
              style={{
                color: item.age?.search('d') < 0 ? 'green' : 'red',
              }}
            >
              {item.age}
            </span>
          ),
          recipient: (
            <div>
              <FileFilled style={{ color: '#AD5A7D', marginRight: '3px' }} />
              {item.recipient.name}
            </div>
          ),
        };
      }),
    [orderList, handleProductEdit],
  );

  return (
    <>
      <div className="main-panel">
        <div className="title-row space-between">
          <h1 className="page-title">Orders :: {selectedOrderStatus?.status.name}</h1>
          {/* {selectedOrderStatus?.status.id === 3 && selectedOrderStatus?.filter && ( */}
          <Button style={{ paddingTop: '0', paddingBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>
                {' '}
                <DownOutlined /> {selectedOrderStatus?.status.name} Queue
              </span>{' '}
              <Badge count={3} color="#5F5FFF" />
            </div>
          </Button>
          {/* )} */}
        </div>
        <Card className="content-box">
          <Space size={HORIZONTAL_SPACE_SIZE} className="button-row">
            {actionButtons.map((btn, index) => (
              <OButton key={index} {...btn} />
            ))}
          </Space>
          <OTable
            type="checkbox"
            columns={orderTableColumns}
            rows={orderTableRows}
            selectedRows={selectedRows}
            setSelectedRows={handleSelectedRows}
          />
          <div className="choose-column" style={{ position: 'absolute', bottom: 20 }} hidden={!showChooseColumn}>
            <OButton icon={<RetweetOutlined />} btnText={''} style={{ color: 'gray' }} />
            <OButton
              icon={<BorderHorizontalOutlined />}
              btnText={''}
              onClick={() => setModal(modalType.SelectOrderColumns)}
              style={{ color: 'gray' }}
            />
            <OButton icon={<CloseOutlined />} btnText={''} onClick={() => setShowChooseColumn(false)} style={{ color: 'gray' }} />
          </div>
        </Card>
      </div>

      <ImportExportSummaryModal
        title="External Shipment Import"
        info="TEST Shipment Import Report"
        getImportExportSummary={getShipmentImportExportSummary}
        isOpen={modalOpen === modalType.ImportExportSummary}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
      />

      <ManualOrderModal
        isOpen={modalOpen === modalType.ManualOrder}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
      />

      <EditOrderModal
        isOpen={modalOpen === modalType.EditOrder}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
      />

      <CancelOrderModal
        isOpen={modalOpen === modalType.CancelOrder}
        onSave={() => {}}
        onClose={() => setModal(modalType.Close)}
      />

      <RestoreOrderModal
        isOpen={modalOpen === modalType.RestoreOrder}
        onSave={() => {}}
        onClose={() => setModal(modalType.Close)}
      />

      <ImportOrderModal
        isOpen={modalOpen === modalType.ImportOrder}
        onSave={() => setModal(modalType.Close)}
        handleConfigureSettings={(value: any) => setModal(value)}
        onClose={() => setModal(modalType.Close)}
      />

      <ImportOrderShipmentModal
        isOpen={modalOpen === modalType.ImportOrderShipments}
        onSave={() => setModal(modalType.ImportExportSummary)}
        onConfigure={() => setModal(modalType.ShipmentImportMapping)}
        onClose={() => setModal(modalType.Close)}
      />

      <ShipmentImportMappingsModal
        isOpen={modalOpen === modalType.ShipmentImportMapping}
        onAdd={() => setModal(modalType.NewShipmentImportMapping)}
        onClose={() => setModal(modalType.ImportOrderShipments)}
      />

      <NewShipmentImportMappingsModal
        isOpen={modalOpen === modalType.NewShipmentImportMapping}
        onSave={() => setModal(modalType.ShipmentImportMapping)}
        onClose={() => setModal(modalType.ShipmentImportMapping)}
      />

      <ExportOrderModal
        isOpen={modalOpen === modalType.ExportOrder}
        onSave={() => setModal(modalType.Close)}
        handleConfigureSettings={(value: any) => setModal(value)}
        onClose={() => setModal(modalType.Close)}
      />

      <OrderExportSettingsModal
        isOpen={modalOpen === modalType.OrderExportSettings}
        onAddOrderExportSettings={() => setModal(modalType.AddOrderExportSettings)}
        onClose={() => setModal(modalType.ExportOrder)}
      />

      <ExportQueueOrderModal
        isOpen={modalOpen === modalType.ExportQueueOrder}
        onSave={() => setModal(modalType.Close)}
        onClose={() => setModal(modalType.Close)}
      />

      <OrderImportSettingsModal
        isOpen={modalOpen === modalType.OrderImportSettings}
        onAddOrderImportSettings={() => setModal(modalType.AddOrderImportSettings)}
        onClose={() => setModal(modalType.ImportOrder)}
      />

      <AddImportSettingsModal
        isOpen={modalOpen === modalType.AddOrderImportSettings}
        onSave={() => setModal(modalType.ImportOrder)}
        onClose={() => setModal(modalType.ImportOrder)}
      />

      <AddExportSettingsModal
        isOpen={modalOpen === modalType.AddOrderExportSettings}
        onSave={() => setModal(modalType.ExportOrder)}
        onClose={() => setModal(modalType.ExportOrder)}
      />

      <SelectOrderColumnsModal
        isOpen={modalOpen === modalType.SelectOrderColumns}
        onSave={(items) => {
          setShowColumns(items);
          setModal(modalType.Close);
        }}
        onClose={() => setModal(modalType.Close)}
      />

      <SplitOrderModal
        isOpen={modalOpen === modalType.SplitOrder}
        onSave={(item) => {
          const newOrderList = [];
          orderList.forEach((order) =>
            order.id === item.id ? newOrderList.push(order, { ...item, id: uuidv4() }) : newOrderList.push(order),
          );
          setOrderList(newOrderList);
          setModal(modalType.Close);
        }}
        onClose={() => setModal(modalType.Close)}
      />

      <DuplicateOrderModal
        isOpen={modalOpen === modalType.DuplicateOrder}
        onSave={() => setModal(modalType.ManualOrder)}
        onClose={() => setModal(modalType.Close)}
      />
    </>
  );
};

export default MainPanel;