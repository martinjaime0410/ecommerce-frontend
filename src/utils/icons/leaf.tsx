import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LeafSvg = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em">
    <path d="m17 8c-9 2-11.1 8.17-13.18 13.34l1.89.66.95-2.3c.48.17.98.3 1.34.3 11 0 14-17 14-17-1 2-8 2.25-13 3.25s-7 5.25-7 7.25 1.75 3.75 1.75 3.75c3.25-9.25 13.25-9.25 13.25-9.25z" />
  </svg>
);

const LeafIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={LeafSvg} {...props} />;

export default LeafIcon;
