export const getTweets = async (prisma, take) => {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      author: true,
    },
    //Only return a certain number of result; if take is null, by default it will return all the result
    take,
  });
};

export const getUserTweets = async (prisma, name) => {
  return await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
    },
    orderBy: [{ createdAt: 'desc' }],
    include: {
      author: true,
    },
  });
};

export const getTweet = async (prisma, id) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { author: true },
  });

  if (tweet.parent) {
    tweet.parentData = await prisma.tweet.findUnique({
      where: { id: tweet.parent },
      include: { author: true },
    });
  }

  return tweet;
};
