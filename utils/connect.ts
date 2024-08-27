import mongoose from 'mongoose';

export async function connectDB() {
  try {
    // DB와 연결이 되어있는지 체크
    if (mongoose.connections[0].readyState) {
      console.log('이미 연걸되어있습니다.');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('연결되었습니다');
  } catch (error) {
    console.error(error);
    throw new Error('잠시 후 다시 시도해주세요.');
  }
}
