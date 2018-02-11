// @flow
import React from 'react';
import styled from 'styled-components';
import { withRouter, type ContextRouter } from 'react-router';
import { modularScale } from 'polished';
import { Icon, Row, Col } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
  isLoggedIn: boolean,
  logout: () => void,
};

type HeaderProps = {
  isMenuOpen: boolean,
  setMenuItemOpen: boolean => void,
  ...ContextRouter,
  isLoggedIn: boolean,
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

const HeaderMenu = ({
  direction,
  showLoginModal,
  isLoggedIn,
  logout,
}: HeaderMenuProps) => (
  <Flex direction={direction}>
    {direction === 'column' && (
      <Box>
        <MenuItem>
          <Icon type="plus-circle-o" /> Post
        </MenuItem>
        {isLoggedIn ? (
          <div>
            <MenuItem onClick={logout}>
              <Icon /> Log Out
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={showLoginModal}>
              <Icon type="login" /> Login or Sign Up
            </MenuItem>
          </div>
        )}
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
  isLoggedIn,
}: HeaderProps) => {
  const showLoginModal = () => showModal('login', location, history);
  const logout = () => {
    localStorage.removeItem('graphcoolToken');
    window.location.reload();
  };
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
          <Logo to="/" />
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
          {isLoggedIn ? (
            <Button onClick={logout} size="large" m={1}>
              Logout
            </Button>
          ) : (
            <span>
              <Button onClick={showLoginModal} size="large" m={1}>
                Login or Sign Up
              </Button>
            </span>
          )}
        </Col>
      </Row>
      {isMenuOpen && (
        <Row type="flex" align="center">
          <Col lg={0} xs={24}>
            <HeaderMenu
              showLoginModal={showLoginModal}
              selectedItem="new"
              direction="column"
              isLoggedIn={isLoggedIn}
              logout={logout}
            />
          </Col>
        </Row>
      )}
      <ModalPresenter />
    </Box>
  );
};

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;

const withIsLoggedIn = graphql(LOGGED_IN_USER, {
  props: ({ data: { loading, loggedInUser } }) => ({
    isLoggedIn: !loading && !!loggedInUser,
  }),
});

export default compose(withIsLoggedIn, withHamburgerMenuToggle, withRouter)(
  Header
);
