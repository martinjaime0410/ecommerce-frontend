import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { useResizable } from 'react-resizable-layout';
import { SampleSplitter, cn } from '@/utils/components/SampleSplitter';
import LeftPanel from './components/LeftPanel';
import LandingPage from './components/LandingPage';
import HistoricalOrdersExports from './Orders/HistoricalOrdersExports';
import HistoricalPurchaseOrdersExports from './PurchaseOrders/HistoricalPurchaseOrdersExports';
import SKUProfitability from './Products/SKUProfitability';
import TopSellers from './Products/TopSellers';
import WorstSellers from './Products/WorstSellers';
import YOYGrowth from './Products/YOYGrowth';
import TrendingProfitability from './Products/TrendingProfitability';
import ShipmentSummary from './Accounting/ShipmentSummary';
import CogsBySKU from './Accounting/CogsBySKU';
import SalesSummary from './Accounting/SalesSummary';
import InventoryValue from './Accounting/InventoryValue';
import ReplenishmentAlerts from './Inventory/ReplenishmentAlerts';
import CriticalInventoryLevels from './Inventory/CriticalInventoryLevels';
import InventoryAging from './Inventory/inventoryaging';
import SnapshotInventory from './Inventory/SnapshotInventory';
import TrendingInventory from './Inventory/TrendingInventory';
import BiggestTickets from './Orders/BiggestTickets';
import Shipments from './Orders/Shipments';

const AnalyticManagement: React.FC = () => {
  const location = useLocation();

  const {
    isDragging: isLeftDragging,
    position: LeftW,
    separatorProps: leftDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 250,
    min: 100,
  });

  const mainContent = useMemo(() => {
    switch (location.pathname) {
      // product
      case '/analytics/products/topsellers':
        return <TopSellers />;
      case '/analytics/products/worstsellers':
        return <WorstSellers />;
      case '/analytics/products/yoygrowth':
        return <YOYGrowth />;
      case '/analytics/products/skuprofitability':
        return <SKUProfitability />;
      case '/analytics/products/trendingprofitability':
        return <TrendingProfitability />;

      // inventory
      case '/analytics/inventory/replenishmentalerts':
        return <ReplenishmentAlerts />;
      case '/analytics/inventory/snapshotinventory':
        return <SnapshotInventory />;
      case '/analytics/inventory/trendinginventory':
        return <TrendingInventory />;
      case '/analytics/inventory/criticalinventorylevels':
        return <CriticalInventoryLevels />;
      case '/analytics/inventory/inventoryaging':
        return <InventoryAging />;

      // orders
      case '/analytics/orders/biggesttickets':
        return <BiggestTickets />;
      case '/analytics/orders/shipments':
        return <Shipments />;
      case '/analytics/orders/historicalexports':
        return <HistoricalOrdersExports />;

      // purchaseorders
      case '/analytics/purchaseorders/historicalexports':
        return <HistoricalPurchaseOrdersExports />;

      // accounting
      case '/analytics/accounting/shipmentsummary':
        return <ShipmentSummary />;
      case '/analytics/accounting/cogsbysku':
        return <CogsBySKU />;
      case '/analytics/accounting/salessummary':
        return <SalesSummary />;
      case '/analytics/accounting/inventoryvalue':
        return <InventoryValue />;
      default:
        return <LandingPage />;
    }
  }, [location.pathname]);

  return (
    <PageContainer
      title={false}
      className={'flex flex-column overflow-hidden'}
      header={{ breadcrumb: {} }}
    >
      <Layout>
        <div className={'flex grow'}>
          <div
            className={cn('shrink-0 contents', isLeftDragging && 'dragging')}
            style={{ width: LeftW }}
          >
            <div className="w-full">
              <LeftPanel />
            </div>
          </div>

          <SampleSplitter isDragging={isLeftDragging} {...leftDragBarProps} />

          <div className="w-full flex flex-column">
            <div className="horizon-content">
              <Layout className="site-layout">{mainContent}</Layout>
            </div>
          </div>
        </div>
      </Layout>
    </PageContainer>
  );
};

export default AnalyticManagement;
