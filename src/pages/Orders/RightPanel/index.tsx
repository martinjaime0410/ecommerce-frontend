import { OButton } from '@/components/Globals/OButton';
import { OInput } from '@/components/Globals/OInput';
import { FormattedMessage, useModel } from '@umijs/max';
import { Alert, Card, Form, Tabs } from 'antd';
import type { FC } from 'react';
import Method from './method';
import Recipient from './Recipient';

const RightPanel: FC = () => {
  const { selectedOrders } = useModel('order');

  const onChange = (key: string) => {
    console.log(key);
  };

  const bulkUpdateTypes = [
    {
      text: 'Fulfillment Type',
      value: 'fulfillmentType',
    },
  ];

  const fulfillmentOptions = [
    {
      text: 'Direct/In-House',
      value: 'directInHouse',
    },
  ];

  const sourceOptions = [
    {
      text: 'Office',
      value: 'office',
    },
  ];

  const strongStyle = {
    color: '#5F5FFF',
  };

  let element = null;

  if (selectedOrders.length > 1) {
    element = (
      <Card title={<FormattedMessage id="pages.orders.rightpanel.title" />}>
        <Alert
          message={
            <div style={{ padding: '0.5rem' }}>
              <b style={strongStyle}>{selectedOrders?.length} orders</b> selected requesting <b style={strongStyle}>STANDARD</b>{' '}
              from <b style={strongStyle}>2</b> different countries.
            </div>
          }
          showIcon
          style={{ background: '#fff' }}
        />
        <div>
          <Form>
            <Form.Item label="Bulk Update" style={{ margin: '1rem 0', paddingBottom: '1rem', borderBottom: '1px dashed black' }}>
              <OInput type="select" name="bulkUpdateType" defaultValue={'fulfillmentType'} options={bulkUpdateTypes} />
            </Form.Item>
            <Form.Item>
              <span>Fulfillment</span>
              <OInput
                type="select"
                name="fulfillment"
                defaultValue={'directInHouse'}
                options={fulfillmentOptions}
                onChange={() => {}}
              />
            </Form.Item>
            <Form.Item>
              <span>Source</span>
              <OInput type="select" name="source" defaultValue={'office'} options={sourceOptions} onChange={() => {}} />
            </Form.Item>
            <Form.Item>
              <OButton btnText={'Update Selected Orders'} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  } else if (selectedOrders.length === 1) {
    element = (
      <>
        <div className="title-row">
          <h1 className="page-title">Order Fulfillment</h1>
        </div>
        <Card>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: 'Method',
                key: '1',
                children: <Method />,
              },
              {
                label: 'Recipient',
                key: '2',
                children: <Recipient />,
              },
            ]}
          />
        </Card>
      </>
    );
  }

  return element;
};

export default RightPanel;
