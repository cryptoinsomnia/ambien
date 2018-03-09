// @flow
import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Row} from 'antd';
import {compose} from 'recompose';
import {Spin} from 'antd';

import Post from './Post';
import Comment from './Comment';
import {Text} from './Text';
import {type PostType} from '../types/api';

export type Props = {
  id: string,
  post: PostType,
  isLoading: boolean,
};

const PostDetails = ({post, isLoading}: Props) => (
  <Row type="flex" align="middle">
    {isLoading
      ? <Spin size="large" />
      : post === undefined
          ? <div>
              <Text bold italic size="large">
                Error loading post. Please try again.
              </Text>
            </div>
          : <div>
              <Text> | id: {post.id} </Text>
              <Text> | title: {post.title}</Text>
              <Text> | url: {post.url}</Text>
              <Text> | createdAt: {post.createdAt}</Text>
            </div>}
  </Row>
);

const SinglePostFetch = gql`
  query Post($id: ID!) {
    post(id: $id) {
      ...PostData
    }
  }
  ${Post.fragments.post}
`;

const withData = graphql (SinglePostFetch, {
  options: props => ({
    variables: {
      id: props.id,
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({data: {loading, post}}) => ({
    isLoading: loading,
    post: loading || !post ? null : post,
  }),
});

export default compose (withData) (PostDetails);
