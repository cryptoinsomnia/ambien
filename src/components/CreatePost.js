// @flow
import React from 'react';
import { Form, Input, Select } from 'antd';

import { Flex, Island, Box } from './Layout';
import Button from './Button';
import { Heading } from './Text';
import tags from '../constants/tags';

const tagNodes = tags.map(tag => (
  <Select.Option key={tag.name}>{tag.displayName}</Select.Option>
));

const CreatePost = () => (
  <Flex align="center" direction="column">
    <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
      <Box borderBottom mb={3}>
        <Heading>Create New Post</Heading>
      </Box>
      <Form layout="vertical">
        <Form.Item label="Title:">
          <Input placeholder="Bitcoin to the moon" />
        </Form.Item>
        <Form.Item label="Link: (optional)">
          <Input placeholder="https://" />
        </Form.Item>
        <Form.Item label="Tags: (optional)">
          <Select mode="tags">{tagNodes}</Select>
        </Form.Item>
        <Form.Item label="Your Thoughts: (optional)">
          <Input.TextArea placeholder="To the moon..." />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary">
            {' '}
            Post{' '}
          </Button>
        </Form.Item>
      </Form>
    </Island>
  </Flex>
);

export default CreatePost;
