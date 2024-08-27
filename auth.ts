import NextAuth, { CredentialsSignin } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { connectDB } from './utils/connect';
import User from './models/User';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      name: 'credentials',
      async authorize(credentials) {
        // DB에 해당 유저의 이메일이 있는지 확인
        await connectDB();
        const user = await User.findOne({
          email: credentials.email,
        });

        // 유저가 없을 때
        if (!user) {
          throw new CredentialsSignin('Not Found Email', {
            cause: '이메일이 존재하지 않습니다.',
          });
        }

        // 비밀번호가 맞는지 확인
        const validPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // 비밀번호가 맞지 않을 때
        if (!validPassword) {
          throw new CredentialsSignin({
            cause: '비밀번호가 일치하지 않습니다.',
          });
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
});
