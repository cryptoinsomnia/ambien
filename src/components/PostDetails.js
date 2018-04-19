// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { Spin } from 'antd';

import { Box, Flex, Island } from './Layout';
import CommentsSection from './CommentsSection';
import Post from './Post';
import Comment from './Comment';
import PostContent from './PostContent';
import { Text } from './Text';
import { type PostType } from '../types/api';

export type Props = {
  id: string,
  post: PostType,
  isLoading: boolean,
};

const PostDetails = ({ post, isLoading }: Props) => (
  <React.Fragment>
    {isLoading ? (
      <Spin size="large" />
    ) : post === undefined ? (
      <div>
        <Text bold italic size="large">
          Error loading post. Please try again.
        </Text>
      </div>
    ) : (
      <React.Fragment>
        <Flex align="center" direction="column">
          <Island my={3} width={[0.95, 0.95, 0.8, 0.8]}>
            <Box borderBottom py={2}>
              <Post rank={-1} noLinks {...post} />
            </Box>
            <Box borderBottom>
              <PostContent content={post.content} />
            </Box>
            <Box heavyBorderBottom>
              <CommentsSection post={post} comments={post.comments} />
            </Box>
          </Island>
        </Flex>
      </React.Fragment>
    )}
  </React.Fragment>
);

const SinglePostFetch = gql`
  query Post($id: ID!) {
    post(id: $id) {
      ...PostData
      votes {
        id
        voter {
          id
        }
      }
      comments {
        post {
          id
        }
        ...CommentData
      }
    }
  }
  ${Post.fragments.post}
  ${Comment.fragments.comment}
`;

const withData = graphql(SinglePostFetch, {
  options: props => ({
    variables: {
      id: props.id,
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, post } }) => ({
    isLoading: loading,
    post: loading || !post ? null : post,
  }),
});

export default compose(withData)(PostDetails);
