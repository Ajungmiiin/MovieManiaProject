'use client';

import { auth } from '@/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type UserInfo = {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<UserInfo>({
    mode: 'onTouched',
  });

  const onValid = async (data: UserInfo) => {
    const userInfo = {
      name: data.userName,
      password: data.password,
      email: data.userEmail,
    };
    const response = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      return;
    }

    // 가입이 완료되면 로그인
    await signIn('credentials', {
      redirect: true,
      redirectTo: '/',
      email: userInfo.email,
      password: userInfo.password,
    });

    return router.refresh();
  };

  function onInvalid(error: any) {
    switch (error) {
      case error.userName:
        setFocus('userName');
      case error.userEmail:
        setFocus('userEmail');
      case error.password:
        setFocus('password');
      case error.checkedPassword:
        setFocus('confirmPassword');
      default:
        return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="mb-2">
        {/* FORM ERROR MESSAGE */}
        {error && <p className="errorMessage mb-2">{error}</p>}

        {/* Name */}
        <div className="mb-2 w-full">
          <input
            type="text"
            className="input border focus:border-black transition-all sm:text-lg"
            placeholder="이름"
            {...register('userName', {
              required: {
                value: true,
                message: '이름은 필수 입니다.',
              },
              validate: {
                minLength: (value) =>
                  value.trim().length >= 2
                    ? true
                    : '이름은 최소 2글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.userName && (
            <p className="errorMessage">{errors.userName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-2 w-full">
          <input
            type="text"
            className="input border focus:border-black transition-all sm:text-lg"
            placeholder="이메일"
            {...register('userEmail', {
              required: {
                value: true,
                message: '이메일은 필수 입니다.',
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: '유효하지 않은 이메일 입니다.',
              },
            })}
          />
          {errors.userEmail && (
            <p className="errorMessage">{errors.userEmail.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-2 w-full">
          <input
            type="password"
            className="input border focus:border-black transition-all sm:text-lg"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 6,
                message:
                  '비밀번호는 영문,숫자를 포함해 최소 6글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className="errorMessage">{errors.password.message}</p>
          )}
        </div>

        {/* ConfirmPassword */}
        <div className="mb-2 w-full">
          <input
            type="password"
            className="input border focus:border-black transition-all sm:text-lg"
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수 입력입니다.',
              validate: {
                confirmPassword: (value) =>
                  value === getValues('password') ||
                  '입력하신 비밀번호와 같지 않습니다.',
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="errorMessage">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit BTN */}
        <button
          type="submit"
          className="text-center bg-black text-white py-2 rounded-sm font-bold w-full hover:opacity-70 transition-opacity sm:text-lg disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? '가입중' : '회원가입'}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
