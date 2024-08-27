import RegisterForm from '@/components/authentication/RegisterForm';
import Link from 'next/link';

const page = () => {
  return (
    <section className="flex items-center justify-center bg-white text-black h-full">
      <div className="p-4 max-w-[600px] w-full">
        <h3 className="font-bold text-3xl mb-2 sm:text-4xl">회원가입</h3>
        <RegisterForm />{' '}
        <p className="font-semibold text-right">
          이미 회원이신가요?
          <span className="text-gray-500 pl-1 font-bold hover:text-gray-700 transition-colors">
            <Link href="/login">로그인하기</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default page;
