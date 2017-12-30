// @flow
import React from 'react';
import { Menu, Icon, Row, Col } from 'antd';
import { withState } from 'recompose';
import type { ComponentType } from 'react';
import type { HOC } from 'recompose';

import Logo from './Logo';
import Container from './Container';
import Button from './Button';

export type Item = 'top' | 'new' | 'trending';

export type HeaderMenuProps = {
  selectedItem: Item,
  selectItem: (item: Item) => void,
};

const MenuItem = (Menu.Item: ComponentType<*>);

const withItemSelection: HOC<*, {}> = withState('selectedItem', 'selectItem');
const HeaderMenu = withItemSelection(
  ({ selectedItem, selectItem }: HeaderMenuProps) => (
    <Menu
      onClick={(e: { key: Item }) => selectItem(e.key)}
      selectedKeys={[selectedItem]}
      mode="horizontal"
    >
      <MenuItem key="top">
        <Icon type="star-o" />Top
      </MenuItem>
      <MenuItem key="new">
        <Icon type="hourglass" />New
      </MenuItem>
      <MenuItem key="trending">
        <Icon type="rocket" />Trending
      </MenuItem>
    </Menu>
  )
);
const Header = () => (
  <Container white>
    <Row type="flex" align="bottom">
      <Col span={6}>
        <Logo />
      </Col>
      <Col span={12}>
        <HeaderMenu />
      </Col>
      <Col span={6}>
        <Button size="large" m={1}>
          Login
        </Button>
        <Button size="large" m={1}>
          Sign Up
        </Button>
      </Col>
    </Row>
  </Container>
);

export default Header;
