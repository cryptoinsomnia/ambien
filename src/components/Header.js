// @flow
import React from 'react';
import styled from 'styled-components';
import { withRouter, type ContextRouter } from 'react-router';
import { modularScale } from 'polished';
import { Icon, Row, Col } from 'antd';
import { withState, compose } from 'recompose';

import Logo from './Logo';
import { Box, Flex } from './Layout';
import Button from './Button';
import ModalPresenter, { showModal } from './ModalPresenter';
import { colors } from '../util/style';

export type Item = 'top' | 'new' | 'trending';

export type HeaderMenuProps = {
  direction: 'row' | 'column',
  selectedItem?: ?Item,
  showLoginModal: () => void,
};

type HeaderProps = {
  isMenuOpen: boolean,
  setMenuItemOpen: boolean => void,
  ...ContextRouter,
};

// Compute the border for a MenuItem depending on whether it is selected
// and whether it is on desktop/mobile
const borderForMenuItem = (
  isSelected: boolean,
  direction: 'column' | 'row'
) => {
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
  ${props => borderForMenuItem(props.isSelected, props.direction)};
  &:hover {
    color: ${colors.blue};
  }
`;

const HeaderMenu = ({ direction, showLoginModal }: HeaderMenuProps) => (
  <Flex direction={direction}>
    {direction === 'column' && (
      <Box>
        <MenuItem>
          <Icon type="plus-circle-o" /> Post
        </MenuItem>
        <MenuItem onClick={showLoginModal}>
          <Icon type="login" /> Login
        </MenuItem>
        <MenuItem>
          <Icon type="user-add" /> Sign Up
        </MenuItem>
      </Box>
    )}
  </Flex>
);

HeaderMenu.defaultProps = {
  direction: 'row',
};

const HambugerIcon = styled(Icon)`
  font-size: 2em;
  cursor: pointer;
`;

const withHamburgerMenuToggle = withState(
  'isMenuOpen',
  'setMenuItemOpen',
  false
);

const Header = ({
  isMenuOpen,
  setMenuItemOpen,
  location,
  history,
}: HeaderProps) => {
  const showLoginModal = () => showModal('login', location, history);
  return (
    <Box white boxShadow>
      <Row type="flex" align="middle">
        <Col
          lg={{
            span: 8,
            offset: 3,
          }}
          xs={21}
        >
          <Logo />
        </Col>
        <Col lg={0} xs={3} onClick={() => setMenuItemOpen(!isMenuOpen)}>
          <HambugerIcon type="bars" />
        </Col>
        <Col
          lg={{
            span: 8,
            offset: 5,
          }}
          xs={0}
        >
          <Button size="large" m={1} icon="plus-circle-o" type="primary">
            Post
          </Button>
          <Button onClick={showLoginModal} size="large" m={1}>
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
            <HeaderMenu
              showLoginModal={showLoginModal}
              selectedItem="new"
              direction="column"
            />
          </Col>
        </Row>
      )}
      <ModalPresenter />
    </Box>
  );
};

export default compose(withHamburgerMenuToggle, withRouter)(Header);
