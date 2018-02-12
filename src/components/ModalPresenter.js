// @flow
import React, { type Node } from 'react';
import {
  withRouter,
  type Location,
  type RouterHistory,
  type ContextRouter,
} from 'react-router';
import { Modal } from 'antd';
import URI from 'jsuri';

import { locationToUri } from '../util/uri';
import FacebookLogin from './FacebookLogin';

// The enumeration of different modals we support.
export type ModalType = 'login' | 'signup';
// The shape of the datastructure returned by `modalInfoForModalName`.
type ModalInfo = {|
  title: string,
  footer: Node,
  content: Node,
|};

export type Props = ContextRouter;

export const showModal = (
  modalName: ModalType,
  location: Location,
  history: RouterHistory
): void => {
  const newPath = locationToUri(location).addQueryParam('modal', modalName);
  history.push(newPath.toString());
};

export const closeModal = (
  location: Location,
  history: RouterHistory
): void => {
  const newPath = locationToUri(location).deleteQueryParam('modal');
  history.push(newPath.toString());
};

const modalInfoForModalName: string => ?ModalInfo = name => {
  switch (name) {
    case 'login':
      return {
        title: 'Login woot woot',
        footer: null,
        content: <FacebookLogin />,
      };
    default:
      return null;
  }
};

const ModalPresenter = ({ location, history }: Props) => {
  const { search } = location;
  const modalName = new URI(search).getQueryParamValue('modal');
  const modalInfo = modalInfoForModalName(modalName);
  if (!modalInfo) {
    return null;
  }
  const { title, footer, content } = modalInfo;
  return (
    <Modal
      title={title}
      visible={true}
      footer={footer}
      onCancel={() => closeModal(location, history)}
    >
      {content}
    </Modal>
  );
};

export default withRouter(ModalPresenter);
