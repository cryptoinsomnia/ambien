// @flow
import React from 'react';
import {Form, Input} from 'antd';

import Button from './Button';

const CreateComment = () => (
  <Form layout="vertical">
    <Form.Item>
      <Input placeholder="Write a comment..." />
    </Form.Item>
    <Form.Item>
      <Button size="large" type="primary">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default CreateComment;
