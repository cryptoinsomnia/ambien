// @flow
import * as React from 'react';
import * as Tree from 't';

import Comment from './Comment';

import {Box} from './Layout';

import {type CommentType} from '../types/api';

type Props = {|
  comments: Array<CommentType>,
|};

const CommentList = ({comments}: Props) => (
  <React.Fragment>
    {comments.map (comment => (
      <Box key={comment.id} borderBottom py={2}>
        <Comment comment={comment} />
      </Box>
    ))}
  </React.Fragment>
);

CommentList.defaultProps = {
  comments: [],
};

var getSortedCommentsToRender = function (comments) {
  var commentsToRender = [];
  Tree.dfs (getTreeGraphOfComments (comments), function (node, par) {
    commentsToRender.push ({
      comment: node,
    });
  });
  return commentsToRender;
};

var getTreeGraphOfComments = function (arr) {
  var tree = [], mappedArr = {}, curComment, mappedComment;

  for (var i = 0, len = arr.length; i < len; i++) {
    curComment = arr[i];
    var children = {children: []};
    var mergedObj = {...curComment, ...children};
    mappedArr[curComment.id] = mergedObj;
  }

  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty (id)) {
      mappedComment = mappedArr[id];
      // If the element is not at the root level, or if it doesn't have a properly
      // formed parent comment, add it to the root level

      if (
        mappedComment.directParentType === 'COMMENT' &&
        mappedComment.threadedParentComment
      ) {
        mappedArr[mappedComment.threadedParentComment[0].id].children.push (
          mappedComment
        );
      } else {
        tree.push (mappedComment);
      }
    }
  }
  return tree;
};

export default CommentList;
