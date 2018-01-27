// @flow
// Where to define types that correspond to API objects.

export type SmallUser = {
  id: string,
  username: string,
  karma: number,
  profileImageUrl: string,
};

export type Tag = {
  name: string,
  displayName: string,
};

export type FeedPost = {
  id: string,
  url: string,
  title: string,
  createdAt: string,
  author: SmallUser,
  comments: Array<{}>,
  votes: Array<{}>,
  tags: Array<Tag>,
};
