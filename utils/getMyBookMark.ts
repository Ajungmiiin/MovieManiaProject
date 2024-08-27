import BookMark from '@/models/BookMark';

const getMyBookMark = async (userId: string) => {
  const myBookmarkList = await BookMark.findOne({
    userId: userId,
  });

  if (!myBookmarkList) {
    return [];
  }

  return myBookmarkList.movieList;
};

export default getMyBookMark;
