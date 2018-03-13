// @flow
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { graphql, compose, type MutationFunc } from 'react-apollo';
import { withRouter, type ContextRouter } from 'react-router';
import gql from 'graphql-tag';

import { showModal } from './ModalPresenter';
import { Flex } from './Layout';
import { Text } from './Text';
import { type VoteType, type ContentType, type SmallUser } from '../types/api';
import withLoggedInUser from '../util/user';

export type Props = {
  id: string,
  type: ContentType,
  votes: Array<VoteType>,
  loggedInUser: SmallUser,
  ...ContextRouter,
  voteOnPostMutation: MutationFunc<{
    loading: boolean,
    data: {
      voteOnPost: {
        postId: string,
      },
    },
  }>,
};

const VotingIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.2em;
  position: relative;
  &:hover {
    bottom: 2px;
  }
`;

const Vote = ({
  id,
  type,
  votes,
  loggedInUser,
  voteOnPostMutation,
  location,
  history,
}: Props) => {
  const showLoginModal = () => showModal('login', location, history);
  const userDidVote = () => {
    if (!loggedInUser) {
      return false;
    }
    return votes.some(vote => vote.voter.id === loggedInUser.id);
  };
  const vote = () => {
    if (type === 'POST') {
      voteOnPostMutation({
        variables: {
          postId: id,
        },
        update: (store, { data: { voteOnPost } }) => {
          // Read the data from the cache for this query.
          const post = store.readFragment({
            id: id, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: gql`
              fragment PostFrag on Post {
                votes {
                  id
                  voter {
                    id
                  }
                }
              }
            `,
          });
          post.votes.push(voteOnPost);
          store.writeFragment({
            id: id,
            fragment: gql`
              fragment PostFrag on Post {
                votes {
                  id
                  voter {
                    id
                  }
                }
              }
            `,
            data: {
              votes: post.votes,
            },
          });
        },
      });
    }
  };

  return (
    <Flex direction="column" align="center">
      {userDidVote() ? null : (
        <VotingIcon
          onClick={loggedInUser ? vote : showLoginModal}
          type="caret-up"
        />
      )}
      <Text>{votes.length}</Text>
    </Flex>
  );
};

Vote.fragments = {
  vote: gql`
    fragment VoteData on Vote {
      id
      createdAt
      contentType
      post {
        id
      }
      comment {
        id
      }
      voter {
        id
        name
        username
        profileImageUrl
      }
    }
  `,
};

const VoteOnPostMutation = gql`
  mutation voteOnPost($postId: ID!) {
    voteOnPost(postId: $postId) {
      id
      voter {
        id
      }
    }
  }
`;

const VoteWithData = graphql(VoteOnPostMutation, {
  name: 'voteOnPostMutation',
});

export default compose(withLoggedInUser, withRouter, VoteWithData)(Vote);
