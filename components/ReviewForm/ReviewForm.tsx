'use client';

import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const initialState = {
  error: null,
  success: false,
};

const ReviewForm = ({
  title,
  action,
}: {
  title: string;
  action: ({}: State, formData: FormData) => Promise<State>;
}) => {
  const router = useRouter();
  const [writeReviewState, writeReviewAction] = useFormState(
    action,
    initialState
  );

  const [value, setValue] = useState<string>('');

  const toast = useToast();

  useEffect(() => {
    if (!writeReviewState.error && writeReviewState.success) {
      router.back();
      toast.success('리뷰가 작성되었습니다.');
    }

    if (writeReviewState.error && !writeReviewState.success) {
      toast.error('잠시 후 다시 시도해주세요.');
    }
  }, [writeReviewState]);

  return (
    <>
      <div className="px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <button onClick={() => router.back()}>
          <IoIosArrowBack size={24} />
        </button>
        <h3 className="font-semibold text-lg">{title}</h3>
        <button
          form="review"
          type="submit"
          className={
            value.trim().length > 0
              ? 'text-white transition-all'
              : 'text-gray-400 transition-all'
          }
          disabled={value.trim().length === 0}
        >
          <FaCheck size={24} />
        </button>
      </div>
      <form id="review" className="w-full h-full " action={writeReviewAction}>
        <textarea
          name="review"
          className="resize-none w-full h-full p-4 text-lg outline-none text-black"
          placeholder="영화를 보고 느낀점을 자유롭게 남겨보세요."
          value={value}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(event.target.value)
          }
        ></textarea>
      </form>
    </>
  );
};

export default ReviewForm;
