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

export type PostType = {
  id: string,
  url: string,
  title: string,
  content: string,
  createdAt: string,
  author: SmallUser,
  comments: Array<CommentType>,
  votes: Array<VoteType>,
  tags: Array<string>,
};

export type CommentType = {
  id: string,
  content: string,
  directParentType: ContentType,
  post: PostType,
  author: SmallUser,
  comment: CommentType,
  createdAt: string,
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
