export const getTweets = async (prisma) => {
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
  return await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { author: true },
  });
};
