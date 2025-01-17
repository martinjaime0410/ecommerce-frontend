import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ShippingSvg = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

const ShippingIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ShippingSvg} {...props} />;

export default ShippingIcon;
