// @flow
import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {compose} from 'recompose';
import {Spin} from 'antd';

import {Box} from './Layout';
import CommentsSection from './CommentsSection';
import Post from './Post';
import PostContent from './PostContent';
import {Text} from './Text';
import {type PostType} from '../types/api';

export type Props = {
  id: string,
  post: PostType,
  isLoading: boolean,
};

const PostDetails = ({post, isLoading}: Props) => (
  <React.Fragment>
    {isLoading
      ? <Spin size="large" />
      : post === undefined
          ? <div>
              <Text bold italic size="large">
                Error loading post. Please try again.
              </Text>
            </div>
          : <React.Fragment>
              <Box borderBottom>
                <Post {...post} noLinks />
              </Box>
              <Box borderBottom>
                {console.log (post)}
                <PostContent content={post.content} />
              </Box>
              <Box borderBottom>
                <CommentsSection />
              </Box>
            </React.Fragment>}
  </React.Fragment>
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
