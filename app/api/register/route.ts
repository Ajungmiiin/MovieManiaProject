import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import User from '@/models/User';
import { connectDB } from '@/utils/connect';

export const POST = async (request: NextRequest) => {
  // 클라이언트 측에서 받아온 INPUT 정보
  const { name, email, password } = await request.json();

  // DB 연결
  await connectDB();

  // 중복된 이메일이 있는지 확인
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: '이미 사용중인 이메일 입니다.' }),
      { status: 400 }
    );
  }

  // 유저 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 5);

  // 새로운 유저 추가
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    // DB 저장
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: '회원가입이 완료되었습니다.' }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error,
      }),
      {
        status: 500,
      }
    );
  }
};
