import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose.models.User => mognoose.model 객체에서 User 찾기
// 만약 없다면 mognoose.model()를 통해 새로운 모델 만들기
export default mongoose.models.User || mongoose.model('User', userSchema);
