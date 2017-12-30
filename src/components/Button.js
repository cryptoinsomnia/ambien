// @flow
import React from 'react';
import { Button } from 'antd';
import { Box } from 'grid-styled';

import type { Node } from 'react';

// https://ant.design/components/button/#API
type AntdButtonProps = {
  ghost?: boolean,
  href?: ?string,
  htmlType?: string,
  icon?: ?string,
  loading?: boolean | { delay: number },
  shape?: ?'circle',
  size?: ?('small' | 'large'),
  target?: ?string,
  type?: ?('primary' | 'ghost' | 'dashed' | 'danger'),
  onClick?: ?() => void,
  children: Node,
};

const InlineBox = Box.extend`
  display: inline-block;
`;

const ButtonWrapper = ({
  ghost,
  href,
  htmlType,
  icon,
  loading,
  shape,
  size,
  target,
  type,
  onClick,
  children,
  ...rest
}: AntdButtonProps) => (
  <InlineBox {...rest}>
    <Button
      ghost={ghost}
      href={href}
      htmlType={htmlType}
      icon={icon}
      loading={loading}
      shape={shape}
      size={size}
      target={target}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  </InlineBox>
);

ButtonWrapper.defaultProps = {
  ghost: false,
  htmlType: 'button',
  loading: false,
};

export default ButtonWrapper;
