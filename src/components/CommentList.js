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
    {getSortedCommentsToRender (comments).map (node => (
      <Box
        key={node.comment.id}
        borderBottom
        py={1}
        marginLeft={`${node.level * 50}px`}
      >
        <Comment
          key={node.comment.id}
          comment={node.comment}
          author={node.comment.author}
          votes={node.comment.votes}
          createdAt={node.comment.createdAt}
        />
      </Box>
    ))}
  </React.Fragment>
);

CommentList.defaultProps = {
  comments: [],
};

var getSortedCommentsToRender = function (comments) {
  var commentsToRender = [];
  var threadedLevelsStack = [];
  Tree.dfs (getTreeGraphOfComments (comments), function (node, par) {
    if (node.threadedParentComment.length == 0) {
      threadedLevelsStack.length = 0;
    } else if (
      threadedLevelsStack.includes (node.threadedParentComment[0].id)
    ) {
      threadedLevelsStack.length =
        threadedLevelsStack.indexOf (node.threadedParentComment[0].id) + 1;
    } else {
      threadedLevelsStack.push (node.threadedParentComment[0].id);
    }
    commentsToRender.push ({
      comment: node,
      level: threadedLevelsStack.length,
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
        mappedComment.threadedParentComment &&
        mappedComment.threadedParentComment[0]
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
