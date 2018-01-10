// @flow
import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Icon, Row, Col } from 'antd';
import { withState } from 'recompose';

import Logo from './Logo';
import { Box, Flex } from './Layout';
import Button from './Button';
import { colors } from '../util/style';

export type Item = 'top' | 'new' | 'trending';

export type HeaderMenuProps = {
  direction: 'row' | 'column',
  selectedItem?: ?Item,
};

type HeaderProps = {
  isMenuOpen: boolean,
  setMenuItemOpen: boolean => void,
};

// Compute the border for a MenuItem depending on whether it is selected
// and whether it is on desktop/mobile
const borderForMenuItem = ({ isSelected, direction }) => {
  if (!isSelected) {
    return null;
  }
  return direction === 'row'
    ? `border-bottom: 2px solid ${colors.blue}`
    : `border-left: 3px solid ${colors.blue}`;
};

const MenuItem = styled.div`
  cursor: pointer;
  padding: ${modularScale(0)} ${modularScale(2)};
  ${props => borderForMenuItem(props)};
  &:hover {
    color: ${colors.blue};
  }
`;

const HeaderMenu = ({ direction, selectedItem }: HeaderMenuProps) => (
  <Flex direction={direction}>
    {direction === 'column' && (
      <Box>
        <MenuItem>
          <Icon type="plus-circle-o" /> Post
        </MenuItem>
        <MenuItem>
          <Icon type="login" /> Login
        </MenuItem>
        <MenuItem>
          <Icon type="user-add" /> Sign Up
        </MenuItem>
      </Box>
    )}
    <MenuItem isSelected={selectedItem === 'top'} direction={direction}>
      <Icon type="star-o" /> Top
    </MenuItem>
    <MenuItem isSelected={selectedItem === 'new'} direction={direction}>
      <Icon type="hourglass" /> New
    </MenuItem>
    <MenuItem isSelected={selectedItem === 'trending'} direction={direction}>
      <Icon type="rocket" /> Trending
    </MenuItem>
  </Flex>
);

HeaderMenu.defaultProps = {
  direction: 'row',
};

const HambugerIcon = styled(Icon)`
  font-size: 2.5em;
  cursor: pointer;
  margin-bottom: 7px;
`;

const withHamburgerMenuToggle = withState(
  'isMenuOpen',
  'setMenuItemOpen',
  false
);
const Header = withHamburgerMenuToggle(
  ({ isMenuOpen, setMenuItemOpen }: HeaderProps) => (
    <Box white>
      <Row type="flex" align="bottom">
        <Col lg={7} xs={21}>
          <Logo />
        </Col>
        <Col lg={0} xs={3} onClick={() => setMenuItemOpen(!isMenuOpen)}>
          <HambugerIcon type="bars" />
        </Col>
        <Col lg={9} xs={0}>
          <HeaderMenu selectedItem="new" />
        </Col>
        <Col lg={8} xs={0}>
          <Button size="large" m={1} icon="plus-circle-o" type="primary">
            Post
          </Button>
          <Button size="large" m={1}>
            Login
          </Button>
          <Button size="large" m={1}>
            Sign Up
          </Button>
        </Col>
      </Row>
      {isMenuOpen && (
        <Row type="flex" align="center">
          <Col lg={0} xs={24}>
            <HeaderMenu selectedItem="new" direction="column" />
          </Col>
        </Row>
      )}
    </Box>
  )
);

export default Header;
