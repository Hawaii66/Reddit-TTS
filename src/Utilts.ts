export const formatUpvotes = (upvotes: number): number => {
  if (upvotes < 1000) {
    return upvotes;
  }

  const rounded = (upvotes / 1000).toPrecision(2);

  return parseFloat(rounded);
};
