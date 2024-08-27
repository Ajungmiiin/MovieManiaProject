import getMyBookMark from './getMyBookMark';
import getMyReview from './getMyReview';
import getMyWatching from './getMyWatching';

export const getMyPage = async (userId: string) => {
  const myReviewList = await getMyReview(userId);
  const myBookmarkList = await getMyBookMark(userId);
  const myWatchingList = await getMyWatching(userId);

  return {
    bookmark: myBookmarkList,
    review: myReviewList,
    watching: myWatchingList,
  };
};
