import { NextResponse } from 'next/server';
import isAuthenticated from '@/auth-logic/is-authenticated';

export async function GET() {
  const auth = await isAuthenticated(undefined);
  return NextResponse.json(auth);
}