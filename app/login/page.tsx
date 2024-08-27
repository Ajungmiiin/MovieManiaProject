import LoginForm from '@/components/authentication/LoginForm';
import Link from 'next/link';

const page = () => {
  return (
    <section className="flex items-center justify-center bg-white text-black h-full">
      <div className="p-4 max-w-[600px]">
        <h3 className="font-bold text-3xl mb-2 sm:text-4xl">로그인</h3>
        <LoginForm />
        <p className="font-semibold text-right">
          아직 회원이 아니신가요?
          <span className="text-gray-500 pl-1 font-bold hover:text-gray-700 transition-colors">
            <Link href="/sign-up">가입하기</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default page;
