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
import withLoggedInUser from '../util/user';
import { type SmallUser } from '../types/api';

export type Item = 'top' | 'new' | 'trending';

export type HeaderMenuProps = {
  direction: 'row' | 'column',
  selectedItem?: ?Item,
  showLoginModal: () => void,
  loggedInUser: SmallUser,
  logout: () => void,
  goToPostPage: () => void,
};

type HeaderProps = {
  isMenuOpen: boolean,
  setMenuItemOpen: boolean => void,
  ...ContextRouter,
  loggedInUser: SmallUser,
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
  loggedInUser,
  logout,
  goToPostPage,
}: HeaderMenuProps) => (
  <Flex direction={direction}>
    {direction === 'column' && (
      <Box>
        <MenuItem onClick={goToPostPage}>
          <Icon type="plus-circle-o" /> Post
        </MenuItem>
        {loggedInUser ? (
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
  loggedInUser,
}: HeaderProps) => {
  const showLoginModal = () => showModal('login', location, history);
  const logout = () => {
    localStorage.removeItem('graphcoolToken');
    window.location.reload();
  };
  const goToPostPage = () => history.push('/post');
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
          <Button
            size="large"
            m={1}
            icon="plus-circle-o"
            type="primary"
            onClick={goToPostPage}
          >
            Post
          </Button>
          {loggedInUser ? (
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
              loggedInUser={loggedInUser}
              logout={logout}
              goToPostPage={goToPostPage}
            />
          </Col>
        </Row>
      )}
      <ModalPresenter />
    </Box>
  );
};

export default compose(withLoggedInUser, withHamburgerMenuToggle, withRouter)(
  Header
);
