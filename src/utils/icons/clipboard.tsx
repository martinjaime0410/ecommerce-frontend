import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ClipboardSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="1em" height="1em">
    <path d="m336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64h-80c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-352c0-26.5-21.5-48-48-48zm-144-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6h-276c-3.3 0-6-2.7-6-6v-340c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z" />
  </svg>
);

const ClipboardIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ClipboardSvg} {...props} />
);

export default ClipboardIcon;