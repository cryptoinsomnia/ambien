// @flow
import React from 'react';
import {Form, Input} from 'antd';
import {withRouter} from 'react-router';
import {graphql, compose, type MutationFunc} from 'react-apollo';
import gql from 'graphql-tag';

import Button from './Button';
import {type PostType} from '../types/api';

export type Props = {|
  createCommentMutation: MutationFunc<{
    loading: boolean,
    data: {
      postId: string,
      content: string,
    },
  }>,
  form: Form,
  post: PostType,
|};

const CreateComment = ({createCommentMutation, form, post}: Props) => {
  const _handleCreateComment = e => {
    e.preventDefault ();
    form.validateFields (async (err, values) => {
      if (!err) {
        await createCommentMutation ({
          variables: {
            content: `${values.comment}`,
            postId: `${post.id}`,
          },
        });
        window.location.reload ();
      }
    });
  };
  const {getFieldDecorator} = form;
  return (
    <Form layout="vertical" onSubmit={_handleCreateComment}>
      <Form.Item>
        {getFieldDecorator ('comment', {
          rules: [
            {
              required: true,
              message: 'Please write a comment...',
            },
          ],
        }) (<Input placeholder="Write a comment..." />)}
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($content: String!, $postId: ID!) {
    createComment(
      content: $content,
      postId: $postId,
    ) {
      id
    }
  }
`;

const WrappedForm = Form.create () (CreateComment);

export default compose (
  graphql (CREATE_COMMENT_MUTATION, {name: 'createCommentMutation'}),
  withRouter
) (WrappedForm);
