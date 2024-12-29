import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import isAuthenticated from './utils/functions/is-authenticated';

import {cookies} from 'next/headers'

export const config = {
  matcher: '/dashboard/:path*',
};

export async function   middleware(request: NextRequest) {
   
  const jwt =  cookies().get('jwt')?.value
  if (jwt?.length==0) {
    console.warn('JWT not found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
   const user= await isAuthenticated(jwt)
  
 
  if (user.isValid=== false) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

   return NextResponse.next();
}