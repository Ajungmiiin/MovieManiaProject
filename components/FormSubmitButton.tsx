'use client';

import { useFormStatus } from 'react-dom';

const FormSubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="text-center bg-black text-white py-2 rounded-sm font-bold w-full hover:opacity-70 transition-opacity sm:text-lg disabled:cursor-not-allowed"
      disabled={pending}
    >
      {children}
    </button>
  );
};

export default FormSubmitButton;
