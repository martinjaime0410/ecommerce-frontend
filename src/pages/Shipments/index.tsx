import { cn, SampleSplitter } from '@/components/Globals/SampleSplitter';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useResizable } from 'react-resizable-layout';
import { Card } from 'antd';
import ReturnMainPanel from './MainPanel/Returns';
import ShipmentMainPanel from './MainPanel/Shipments';
import SidePanel from './SidePanel';

const ShipmentManagement: React.FC = () => {
  const { searchType } = useModel('shipment');

  const {
    isDragging: isLeftDragging,
    position: LeftW,
    separatorProps: leftDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 220,
    min: 50,
  });

  return (
    <PageContainer title={false} className={'flex flex-column overflow-hidden'}>
      <div className={'flex grow'}>
        <Card
          className={cn('shrink-0 contents', isLeftDragging && 'dragging')}
          style={{ width: LeftW }}
          bodyStyle={{ padding: 0 }}
        >
          <div className="w-full">
            <SidePanel />
          </div>
        </Card>

        <SampleSplitter isDragging={isLeftDragging} {...leftDragBarProps} />

        <div className="w-full flex flex-column h-screen">
          <div className="horizon-content main-panel" style={{ overflow: 'scroll' }}>
            <div className="main-panel">
              {searchType === 'returns' && <ReturnMainPanel />}
              {searchType !== 'returns' && <ShipmentMainPanel />}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ShipmentManagement;
