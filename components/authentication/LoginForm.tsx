'use client';

import { useFormState } from 'react-dom';

import { loginHandler } from '@/utils/action/action';

import FormSubmitButton from '../FormSubmitButton';
import { useRouter } from 'next/navigation';

const initState = {
  error: false,
  message: '',
};

const LoginForm = () => {
  const router = useRouter();
  const [state, action] = useFormState(loginHandler, initState);

  //  서버액션에서 오류없이 null 값을 반환했다면 redirect
  if (state === null) {
    router.back();
  }
  return (
    <>
      <form action={action} className="mb-2">
        {state?.error === true && (
          <p className="errorMessage my-2">{state!.message}</p>
        )}
        <input
          type="text"
          className="input border mb-2 focus:border-black transition-all sm:text-lg"
          name="userEmail"
          placeholder="이메일"
        />
        <input
          type="password"
          className="input border mb-2 focus:border-black transition-all sm:text-lg"
          name="password"
          placeholder="비밀번호"
        />
        <FormSubmitButton>로그인</FormSubmitButton>
      </form>
    </>
  );
};

export default LoginForm;
