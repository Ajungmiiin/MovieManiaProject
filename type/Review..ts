export type movieReviewList = {
  comments: Comment[];
  createAt?: string;
  movieId: string;
  movieName: string;
  updateAt?: string;
  __v?: number;
  _id?: string;
};

export type Comment = {
  userId: string;
  userName: string;
  movieName?: string;
  movieId?: string;
  comment: string;
  _id: string;
};
