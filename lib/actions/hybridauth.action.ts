'use server';

import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7;

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

// 设置用户 session（服务端）
export const setUserSession = async (user: User) => {
  try {
    const cookieStore = await cookies();
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      loginAt: new Date().toISOString(),
    };

    cookieStore.set('user_session', JSON.stringify(sessionData), {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error setting session:', error);
    return { success: false, message: error.message };
  }
};

// 获取当前用户（服务端）
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get('user_session')?.value;

    if (!sessionData) {
      return null;
    }

    return JSON.parse(sessionData);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// 检查认证状态（服务端）
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

// 登出（服务端）
export const signOut = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('user_session');

    return { success: true, message: 'Signed out successfully.' };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return { success: false, message: error.message };
  }
};
