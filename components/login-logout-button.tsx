'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";

export default function LoginLogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState((Cookies.get('jwt')?.length ?? 0) > 3);

  const handleLogout = () => {
    Cookies.remove('jwt');  
    setIsLoggedIn(false);  
    console.log('checkLoginStatus :  False');

  };

  const updateLoginState = () => {
    const jwt = Cookies.get('jwt'); 

    if (jwt !== undefined) {
      if (jwt.length > 3) {
        setIsLoggedIn(true);
        console.log('checkLoginStatus :  True');
      }
    }
     else {
      setIsLoggedIn(false);
      console.log('checkLoginStatus :  False');
    }
  };

  useEffect(() => {
     updateLoginState();
  });

  useEffect(() => {
     updateLoginState();
  }), [];



  return (
    < >

      {
      !isLoggedIn ? 
      ( 
        <Link href="/login" className=" w-full  hover:border px-3 py-1 border  border-muted rounded-sm hover:border-primary  cursor-pointer" onClick={updateLoginState}>
          Login
        </Link>
     
    
      ) : (

        <AlertDialog>
          <AlertDialogTrigger asChild >
            <Button variant="outline">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='  bg-popover'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <Link href="/" className="            rounded-lg   cursor-pointer" onClick={handleLogout}>
                <AlertDialogAction>
                  Logout
                </AlertDialogAction>
              </Link>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
      }
    </ >
  );
}
