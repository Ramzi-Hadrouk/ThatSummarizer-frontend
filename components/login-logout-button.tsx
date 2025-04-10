'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged_state = Cookies.get('that_summarizer_logged_state');
    if (logged_state && logged_state.length > 3) {
      setIsLoggedIn(true);
      console.log('checkLoginStatus : True');
    } else {
      setIsLoggedIn(false);
      console.log('checkLoginStatus : False');
    }
  }); 

  const handleLogout = () => {
    Cookies.remove('that_summarizer_logged_state');
    setIsLoggedIn(false);
    console.log('checkLoginStatus : False');
  };

  return (
    <>
      {!isLoggedIn ? (
        <Link
          href="/login"
          className="w-full hover:border px-3 py-1 border border-muted rounded-sm hover:border-primary cursor-pointer"
        >
          Login
        </Link>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline"><LogOut/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-popover'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Link
                href="/"
                className="rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                <AlertDialogAction>
                  Logout
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
