import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BoxSvg = () => (
  <svg viewBox="0 0 20 20" width="1em" height="1em">
    <path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z" />
  </svg>
);

const BoxIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={BoxSvg} {...props} />;

export default BoxIcon;
