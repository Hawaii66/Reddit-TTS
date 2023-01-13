export interface IRedditPost {
  text: string;
  author: string;
  upvotes: number;
  comments: IRedditPost[];
}
