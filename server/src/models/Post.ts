import { IUser } from './User';

type Post = {
  title: string;
  summary: string;
  author: IUser | string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[] | string[];
};

type Comment = {
  author: IUser | string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  parentComment: Comment | undefined;
};
