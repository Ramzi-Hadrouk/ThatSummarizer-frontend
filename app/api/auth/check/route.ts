import { NextResponse } from 'next/server';
import isAuthenticated from '@/auth-logic/is-authenticated';

interface ApiResponse{
  isValid: boolean;
  data: any ;
  error: string | null;
  token?: string;
}

export async function GET() {
  const auth :ApiResponse = await isAuthenticated(undefined);
  return NextResponse.json(auth);
}