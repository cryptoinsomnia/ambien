// @flow
import React, { Component } from 'react';
import { Form, Input, Select, Spin, Alert } from 'antd';
import { withRouter, type ContextRouter } from 'react-router';
import { graphql, compose, type MutationFunc } from 'react-apollo';

import { Flex, Island, Box } from './Layout';
import Button from './Button';
import { Heading } from './Text';
import tags from '../constants/tags';
import gql from 'graphql-tag';
import { type FormProp } from '../types/form';

const tagNodes = tags.map(tag => (
  <Select.Option key={tag.name}>{tag.displayName}</Select.Option>
));

type Props = {
  form: FormProp,
  ...ContextRouter,
  createPost: MutationFunc<{
    data: {
      createPost: {
        id: string,
      },
    },
  }>,
};

type State = {
  isLoading: boolean,
  didError: boolean,
};

class CreatePost extends Component<Props, State> {
  state = {
    isLoading: false,
    didError: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.props
          .createPost({ variables: value })
          .then(({ data }) => {
            this.setState({ isLoading: false, didError: false }, () => {
              this.props.history.push(`/post/${data.createPost.id}`);
            });
          })
          .catch(() => {
            this.setState({ isLoading: false, didError: true });
          });
      }
    });
  };

  validateLink = (rule, value, callback) => {
    if (!value && !this.props.form.getFieldValue('content')) {
      callback('Please provide a link if you are not sharing your thoughts.');
    }
    callback();
  };

  validateDescription = (rule, value, callback) => {
    if (!value && !this.props.form.getFieldValue('url')) {
      callback('Please share your thoughts if you are not sharing a link.');
    }
    callback();
  };

  renderErrorMessage = () => (
    <Alert
      type="error"
      message="Something went wrong. Please try again later"
      closable
    />
  );
  renderLoading = () => <Spin size="large" />;

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, didError } = this.state;
    return (
      <Flex align="center" direction="column">
        <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
          <Box borderBottom mb={3}>
            <Heading>Create New Post</Heading>
          </Box>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Title:">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input a title for your post!',
                  },
                ],
              })(<Input placeholder="Bitcoin to the moon" />)}
            </Form.Item>
            <Form.Item label="Link:">
              {getFieldDecorator('url', {
                rules: [
                  { validator: this.validateLink },
                  {
                    type: 'url',
                    message: 'Your URL is not correctly formatted',
                  },
                ],
              })(<Input placeholder="https://" />)}
            </Form.Item>
            <Form.Item label="Tags:">
              {getFieldDecorator('tags')(
                <Select mode="tags">{tagNodes}</Select>
              )}
            </Form.Item>
            <Form.Item label="Your Thoughts:">
              {getFieldDecorator('content', {
                rules: [{ validator: this.validateDescription }],
              })(<Input.TextArea placeholder="To the moon..." />)}
            </Form.Item>
            <Form.Item>
              {isLoading ? (
                this.renderLoading()
              ) : (
                <Button size="large" htmlType="submit" type="primary">
                  Post
                </Button>
              )}
            </Form.Item>
          </Form>
          {didError && this.renderErrorMessage()}
        </Island>
      </Flex>
    );
  }
}

const CreatePostMutation = gql`
  mutation CreatePostMutation($title: String!, $url: String, $content: String) {
    createPost(title: $title, url: $url, content: $content) {
      id
    }
  }
`;

const withCreatePostMutation = graphql(CreatePostMutation, {
  name: 'createPost',
});

export default compose(Form.create(), withCreatePostMutation, withRouter)(
  CreatePost
);
