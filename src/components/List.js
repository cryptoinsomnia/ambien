// @flow
import React from 'react';
import { List as AntList } from 'antd';

import type { Node } from 'react';

const Item = AntList.Item;

type Grid = {|
  gutter: number,
  column: number,
|};

// More info to be added, and probably should be importing type from somewhere else.
type User = {|
  username: string,
|};

export type SubmissionInfo = {
  title: string,
  url: string,
  author: User,
  comments: Array<{}>,
};

// https://ant.design/components/list/#API
type Props = {|
  dataSource?: Array<SubmissionInfo>,
  bordered?: boolean,
  split?: boolean,
  itemLayout?: 'horizontal' | 'vertical',
  footer?: ?Node,
  grid?: ?Grid,
  header?: ?Node,
  loading?: boolean,
  loadMore?: ?Node,
|};

export const Submission = ({
  title,
  url,
  author,
  comments,
}: SubmissionInfo) => (
  <Item actions={[<a key="comment">comment</a>, <a key="flag">flag</a>]}>
    <Item.Meta
      title={<a href={url}>{title}</a>}
      description={`${author.username} | ${comments.length} comments`}
    />
  </Item>
);

const List = ({
  dataSource,
  bordered,
  split,
  itemLayout,
  footer,
  grid,
  header,
  loading,
  loadMore,
}: Props) => (
  <AntList
    dataSource={dataSource}
    bordered={bordered}
    split={split}
    itemLayout={itemLayout}
    footer={footer}
    grid={grid}
    header={header}
    loading={loading}
    loadMore={loadMore}
    renderItem={(submission: SubmissionInfo) => <Submission {...submission} />}
  />
);

List.defaultProps = {
  dataSource: [],
  bordered: false,
  itemLayout: 'horizontal',
  loading: false,
};

export default List;
