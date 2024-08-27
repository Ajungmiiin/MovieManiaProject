import mongoose from 'mongoose';

const BookMarkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    movieList: [
      {
        id: String,
        title: String,
        imageSrc: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BookMark ||
  mongoose.model('BookMark', BookMarkSchema);
