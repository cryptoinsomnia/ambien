// @flow
import React from 'react';
import {Form, Input} from 'antd';

import {Flex, Island} from './Layout';
import Button from './Button';

const CreateComment = () => (
  <Flex align="center" direction="column">
    <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
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
    </Island>
  </Flex>
);

export default CreateComment;
