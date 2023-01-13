import { IRedditPost } from "./Interface";

export const getPost = async (): Promise<IRedditPost> => {
  const result = await fetch(
    "https://www.reddit.com/r/askreddit/top.json?limit=1"
  );
  const { data } = await result.json();
  const posts: IRedditPost[] = data.children.map(async (postOwner: any) => {
    const comments = await getComments(postOwner.data.permalink, 10);

    return {
      text: postOwner.data.title,
      author: postOwner.data.author,
      comments,
      upvotes: postOwner.data.score,
    };
  });

  return posts[0];
};

export const getComments = async (
  link: string,
  max = 10
): Promise<IRedditPost[]> => {
  const api = `https://www.reddit.com${link}.json`;
  const result = await fetch(api);
  const json = await result.json();
  const data = json[1].data.children;

  const comments: IRedditPost[] = data
    .map((comment) => {
      return {
        text: comment.data.body,
        author: comment.data.author,
        comments: [],
        upvotes: comment.data.score,
      };
    })
    .filter(
      (comment) => comment.text !== "[removed]" && comment.text !== undefined
    );

  comments.sort((a, b) => b.upvotes - a.upvotes);

  return comments.slice(0, max);
};
