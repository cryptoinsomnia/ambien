// @flow
import * as React from 'react';
import styled from 'styled-components';
import { withRouter, type ContextRouter } from 'react-router';
import { modularScale } from 'polished';
import { Icon, Row, Col, Avatar } from 'antd';
import { withState, compose } from 'recompose';

import Logo from './Logo';
import Link from './Link';
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
  goToUserProfile: () => void,
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
  goToUserProfile,
}: HeaderMenuProps) => (
  <Flex direction={direction}>
    {direction === 'column' && (
      <Box>
        <MenuItem onClick={goToUserProfile}>
          <Avatar
            src={loggedInUser.profileImageUrl}
            icon="user"
            size="small"
            style={{ backgroundColor: colors.blue }}
          />{' '}
          Profile
        </MenuItem>
        <MenuItem onClick={goToPostPage}>
          <Icon type="plus-circle-o" /> Post
        </MenuItem>
        {loggedInUser ? (
          <MenuItem onClick={logout}>
            <Icon /> Log Out
          </MenuItem>
        ) : (
          <MenuItem onClick={showLoginModal}>
            <Icon type="login" /> Login or Sign Up
          </MenuItem>
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
  const goToUserProfile = () => history.push('/user/' + loggedInUser.username);
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
            span: 7,
            offset: 6,
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
            <React.Fragment>
              <Button onClick={logout} size="large" m={1}>
                Logout
              </Button>
              <Link href={'/user/' + loggedInUser.username}>
                <Avatar
                  src={loggedInUser.profileImageUrl}
                  icon="user"
                  size="large"
                  style={{ backgroundColor: colors.blue }}
                />
              </Link>
            </React.Fragment>
          ) : (
            <Button onClick={showLoginModal} size="large" m={1}>
              Login or Sign Up
            </Button>
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
              goToUserProfile={goToUserProfile}
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
