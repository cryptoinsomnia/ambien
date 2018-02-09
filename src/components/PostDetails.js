// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Row } from 'antd';
import { compose } from 'recompose';
import { Spin } from 'antd';

import { Text } from './Text';
import { type FeedPost } from '../types/api';

export type Props = {
  id: string,
  post: FeedPost,
  isLoading: boolean,
};

const PostDetails = ({ post, isLoading }: Props) => (
  <Row type="flex" align="middle">
    {isLoading ? (
      <Spin size="large" />
    ) : (
      <div>
        <Text> | id: {post.id} </Text>
        <Text> | title: {post.title}</Text>
        <Text> | url: {post.url}</Text>
        <Text> | createdAt: {post.createdAt}</Text>
      </div>
    )}    
  </Row>
);

const Post = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      url
      createdAt
      author {
        username
      }
      comments {
        id
      }
      votes {
        id
      }
    }
  }
`;

// graphql(Query) returns a Higher Order Component that injects the result of Query into the Component
// to which it is applied. Takes an options argument.
const withData = graphql(Post, {
  options: ({ id }) => ({
    id: id,
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, post } }) => ({
    isLoading: loading,
    post,
  }),
});

export default compose(withData)(PostDetails);