import { useMemo, useState } from 'react';
import { Card, Table, Row, Col, Button, Input } from 'antd';
import { OModal } from '@/components/Globals/OModal';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { defaultShowColumns } from '@/data/orderData';

interface ISelectOrderColumns {
  isOpen: boolean;
  onClose: () => void;
  onSave: (items: string[]) => void;
}

const SelectOrderColumns: React.FC<ISelectOrderColumns> = ({ isOpen, onClose, onSave }) => {
  const [showColumns, setShowColumns] = useState(defaultShowColumns);
  const [hideColumns, setHideColumns] = useState([]);
  const [search, setSearch] = useState('');

  const filterColumns = useMemo(
    () => hideColumns.filter((column) => column.includes(search)),
    [hideColumns, search],
  );

  return (
    <OModal
      title="Select Columns"
      width={1200}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'cancel',
          type: 'default',
          btnLabel: 'Cancel',
          onClick: onClose,
        },
        {
          key: 'save',
          type: 'default',
          btnLabel: 'Save',
          onClick: () => onSave(showColumns),
        },
      ]}
    >
      <>
        <Card>
          <Row gutter={10}>
            <Col span={12}>
              <Table
                columns={[
                  {
                    key: 'name',
                    dataIndex: 'name',
                    title: '41 Available Columns',
                    render: (value) => <>{value}</>,
                    width: '70%',
                  },
                  {
                    key: 'actions',
                    dataIndex: 'actions',
                    title: (
                      <>
                        <a
                          onClick={() => {
                            setHideColumns([...hideColumns, ...showColumns]);
                            setShowColumns([]);
                          }}
                        >
                          <u>Hide All</u>
                        </a>
                      </>
                    ),
                    render: (value, record) => (
                      <>
                        <Button
                          icon={<MinusOutlined />}
                          onClick={() => {
                            setShowColumns((prev) =>
                              prev.filter((column) => column !== record.name),
                            );
                            setHideColumns([...hideColumns, record.name]);
                          }}
                        />
                      </>
                    ),
                    align: 'right',
                  },
                ]}
                dataSource={showColumns.map((column, index) => ({ name: column, key: index }))}
                pagination={{ hideOnSinglePage: true, pageSize: 42 }}
                scroll={{ y: 400 }}
                style={{ minHeight: 400 }}
              />
            </Col>
            <Col span={12}>
              <Row align="middle" style={{ marginTop: 2 }}>
                <Col span={4}>
                  <a
                    style={{ fontWeight: 500, textTransform: 'uppercase' }}
                    onClick={() => {
                      setShowColumns([...showColumns, ...hideColumns]);
                      setHideColumns([]);
                    }}
                  >
                    <u>Add All</u>
                  </a>
                </Col>
                <Col offset={1} span={19}>
                  <Input size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Col>
              </Row>
              <Table
                columns={[
                  {
                    key: 'name',
                    dataIndex: 'name',
                    render: (value) => <>{value}</>,
                    width: '70%',
                  },
                  {
                    key: 'actions',
                    dataIndex: 'actions',
                    title: '',
                    render: (value, record) => (
                      <>
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => {
                            setHideColumns((prev) =>
                              prev.filter((column) => column !== record.name),
                            );
                            setShowColumns([...showColumns, record.name]);
                          }}
                        />
                      </>
                    ),
                    align: 'right',
                  },
                ]}
                dataSource={filterColumns.map((column, index) => ({ name: column, key: index }))}
                pagination={{ hideOnSinglePage: true, pageSize: 42 }}
                scroll={{ y: 400 }}
                style={{ marginTop: 2 }}
                showHeader={false}
              />
            </Col>
          </Row>
        </Card>
      </>
    </OModal>
  );
};

export default SelectOrderColumns;