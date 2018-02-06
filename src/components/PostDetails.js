// @flow
import React from 'react';
import { Row } from 'antd';

export type Props = {
  id: Object,
};

const PostDetails = ({ id }: Props) => (
  <Row type="flex" align="middle">
    This will be the post details page for the post with an id of {id.match.params.id}
  </Row>
);

export default PostDetails;
