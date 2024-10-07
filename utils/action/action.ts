'use server';

import { signIn, signOut } from '@/auth';
import { CredentialsSignin } from 'next-auth';
import { revalidatePath } from 'next/cache';

interface formStateType {
  error: boolean;
  message: string;
}

export const loginHandler = async (
  state: formStateType | any,
  formData: FormData
) => {
  try {
    await signIn('credentials', {
      redirect: false,
      email: formData.get('userEmail'),
      password: formData.get('password'),
    });

    revalidatePath('/movie/[id]', 'page');
    revalidatePath('/');

    return null;
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return {
        error: true,
        message: error.cause as unknown as string,
      };
    }
  }
};

export const signOutHandler = async () => {
  await signOut();
};
