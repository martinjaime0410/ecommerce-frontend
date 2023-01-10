import type { MenuProps } from 'antd';
import { Layout, Menu, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import HistoricalExports from './Orders/HistoricalExports';
import React, { useState } from 'react';

const { Sider, Content } = Layout;

const AnalyticManagement: React.FC = () => {
  const rootSubmenuKeys = ['main1', 'main2', 'main3', 'main4', 'main5'];

  const [openKeys, setOpenKeys] = useState(['main3']);
  const [selectKey, setSelectedKey] = useState('sub34');

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
  };

  let renderableContent = null;
  if (selectKey === 'sub34') renderableContent = <HistoricalExports />;

  return (
    <PageContainer title={false} className={'flex flex-column overflow-hidden'}>
      <Layout>
        <Sider width={250} trigger={null}>
          <div className="logo" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['main3', selectKey]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onSelect={handleSelect}
            items={[
              {
                key: 'main1',
                icon: <UserOutlined />,
                label: 'Products',
                children: [
                  {
                    key: 'sub11',
                    icon: <UserOutlined />,
                    label: 'Test',
                  },
                ],
              },
              {
                key: 'main2',
                icon: <UserOutlined />,
                label: 'Inventory',
                children: [
                  {
                    key: 'sub21',
                    icon: <UserOutlined />,
                    label: 'Test',
                  },
                ],
              },
              {
                key: 'main3',
                icon: <UserOutlined />,
                label: 'Orders',
                children: [
                  {
                    key: 'sub31',
                    icon: <UserOutlined />,
                    label: 'Sales Overview',
                  },
                  {
                    key: 'sub32',
                    icon: <UserOutlined />,
                    label: 'Biggest Tickets',
                  },
                  {
                    key: 'sub33',
                    icon: <UserOutlined />,
                    label: 'Shipments',
                  },
                  {
                    key: 'sub34',
                    icon: <UserOutlined />,
                    label: 'Historical Exports',
                  },
                ],
              },
              {
                key: 'main4',
                icon: <UserOutlined />,
                label: 'Customers',
                children: [
                  {
                    key: 'sub41',
                    icon: <UserOutlined />,
                    label: 'Test',
                  },
                ],
              },
              {
                key: 'main5',
                icon: <UserOutlined />,
                label: 'Accounting',
                children: [
                  {
                    key: 'sub51',
                    icon: <UserOutlined />,
                    label: 'Test',
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Divider type="vertical" orientation="left" />
        <Layout className="site-layout">
          <Content className="site-layout-background">{renderableContent}</Content>
        </Layout>
      </Layout>
    </PageContainer>
  );
};

export default AnalyticManagement;
