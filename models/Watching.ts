import mongoose from 'mongoose';

const WatchingSchema = new mongoose.Schema(
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

export default mongoose.models.Watching ||
  mongoose.model('Watching', WatchingSchema);
