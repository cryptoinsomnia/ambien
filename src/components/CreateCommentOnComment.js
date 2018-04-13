// @flow
import React from 'react';
import {Form, Input} from 'antd';
import {withRouter} from 'react-router';
import {graphql, compose, type MutationFunc} from 'react-apollo';
import gql from 'graphql-tag';

import Button from './Button';

export type Props = {|
  createCommentOnCommentMutation: MutationFunc<{
    loading: boolean,
    data: {
      postId: string,
      parentCommentId: string,
      content: string,
    },
  }>,
  form: Form,
  postId: string,
  parentCommentId: string,
|};

const CreateCommentOnComment = ({
  createCommentOnCommentMutation,
  form,
  postId,
  parentCommentId,
}: Props) => {
  const _handleCreateCommentOnComment = e => {
    e.preventDefault ();
    form.validateFields (async (err, values) => {
      if (!err) {
        await createCommentOnCommentMutation ({
          variables: {
            content: `${values.comment}`,
            postId: `${postId}`,
            parentCommentId: `${parentCommentId}`,
          },
        });
        window.location.reload ();
      }
    });
  };
  const {getFieldDecorator} = form;
  return (
    <Form layout="vertical" onSubmit={_handleCreateCommentOnComment}>
      <Form.Item>
        {getFieldDecorator ('comment', {
          rules: [
            {
              required: true,
              message: 'Please write a comment...',
            },
          ],
        }) (<Input />)}
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const CREATE_COMMENT_ON_COMMENT_MUTATION = gql`
  mutation CreateComment($content: String!, $postId: ID!, $parentCommentId: ID!) {
    createComment(
      content: $content,
      postId: $postId,
      parentCommentId: $parentCommentId,
    ) {
      id
    }
  }
`;

const WrappedForm = Form.create () (CreateCommentOnComment);

export default compose (
  graphql (CREATE_COMMENT_ON_COMMENT_MUTATION, {
    name: 'createCommentOnCommentMutation',
  }),
  withRouter
) (WrappedForm);
