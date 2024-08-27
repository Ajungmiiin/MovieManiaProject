import Watching from '@/models/Watching';

const getMyWatching = async (userId: string) => {
  const myWatchingList = await Watching.findOne({
    userId: userId,
  });

  if (!myWatchingList) {
    return [];
  }

  return myWatchingList.movieList;
};

export default getMyWatching;
