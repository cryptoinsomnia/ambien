// @flow
// Where to define types that correspond to API objects.

// Disable linter because there are circular dependencies
/* eslint-disable no-use-before-define */
export type ContentType = 'POST' | 'COMMENT';

export type SmallUser = {
  id: string,
  name: string,
  username: string,
  karma: number,
  profileImageUrl: string,
};

export type Tag = {
  name: string,
  displayName: string,
};

export type PostType = {
  id: string,
  url: string,
  title: string,
  content: string,
  createdAt: string,
  author: SmallUser,
  comments: Array<CommentType>,
  votes: Array<VoteType>,
  tags: Array<Tag>,
};

export type CommentType = {
  id: string,
  content: string,
  directParentType: ContentType,
  threadedParentComment: CommentType,
  post: PostType,
  author: SmallUser,
  comment: CommentType,
  createdAt: string,
  votes: Array<VoteType>,
};

export type VoteType = {
  id: string,
  contentType: ContentType,
  post: PostType,
  comment: CommentType,
  createdAt: string,
  voter: SmallUser,
};
/* eslint-enable no-use-before-define */
