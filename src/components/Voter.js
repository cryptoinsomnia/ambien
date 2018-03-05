// @flow
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { graphql, compose, type MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';

import { withRouter, type ContextRouter } from 'react-router';
import { showModal } from './ModalPresenter';
import { Flex } from './Layout';
import { Text } from './Text';
import { type VoteType, type ContentType, type SmallUser } from '../types/api';
import loggedInUser from '../util/user';

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

const Voter = ({
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
    return votes.filter(vote => vote.voter.id === loggedInUser.id).length > 0;
  };
  const vote = async () => {
    if (type === 'POST') {
      voteOnPostMutation({
        variables: {
          postId: id,
        },
        // This doesn't work yet..
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   voteOnPost: {
        //     __typename: 'Vote',
        //     id: Math.round(Math.random() * -1000000),
        //     voter: {
        //       __typename: 'User',
        //       id: loggedInUser.id,
        //     },
        //   },
        // },
        //   update: (store, { data: { newVote } }) => {
        //     // Read the data from the cache for this query.
        //     const data = store.readQuery({ query: Feed });
        //     console.log(data);
        //     // Add our channel from the mutation to the end.
        //     data.posts.filter(post => post.id === id).votes.push(newVote);
        //     // Write the data back to the cache.
        //     store.writeQuery({ query: Feed, data });
        //   },
      });
      // console.log('Voted!');
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

const VoteOnPostMutation = gql`
  mutation voteOnPost($postId: ID!) {
    voteOnPost(postId: $postId) {
      voter {
        id
      }
    }
  }
`;

const VoteWithData = graphql(VoteOnPostMutation, {
  name: 'voteOnPostMutation',
});

export default compose(loggedInUser, withRouter, VoteWithData)(Voter);
