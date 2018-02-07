// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { Row } from 'antd';

import { Spin } from 'antd';

import { Text } from './Text';
import { type SmallUser } from '../types/api';

export type Props = {
    id: string,
    user: SmallUser,
    isLoading: boolean,
}

const Profile = ({ user, isLoading }: Props) => (
    <Row type="flex" align="middle">
        {isLoading ? (
            <Spin size="large" />
        ) : (
            <div>
                <Text> | id: {user.id} </Text>
                <Text> | username: {user.username}</Text>
            </div>
        )}
    </Row>
);

const User = gql`
    query User($id: ID!) {
        User(id: $id) {
            id
            username
        }
    }`;

const withData = graphql(User, {
    options: ({ id }) => ({
        id: id,
        notifyOnNetworkStatusChange: true,
    }),
    props: ({ data: { loading, User }}) => ({
        isLoading: loading,
        user: User,
    }),
});

export default compose(withData)(Profile);