import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
