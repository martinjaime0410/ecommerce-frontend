import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ArrowCircleDownSvg = () => (
  <svg viewBox="0 0 512 512" width="1em" height="1em">
    <path d="m504 256c0 137-111 248-248 248s-248-111-248-248 111-248 248-248 248 111 248 248zm-292-116v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5h-70.8v-116c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z" />
  </svg>
);

const ArrowCircleDownIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ArrowCircleDownSvg} {...props} />;

export default ArrowCircleDownIcon;
