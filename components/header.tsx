'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/modeToggle';
import type { Footer } from '@/utils/interfaces/types';
import Link from 'next/link';
import LoginLogoutButton from './login-logout-button';
import { House } from 'lucide-react';

export default function Header({ data }: { data: Footer }) {  
    

   
    return (
        <header className='w-[100%] bg-popover md:border-b border-spacing-1 justify-between sticky z-10 top-0 grid grid-flow-col px-2 py-1 gap-3'>
            <Link className="justify-self-start w-fit  text-xl md:text-2xl font-extrabold py-1" href={data.logo.url}>
            <House  className='md:hidden'  size={30}  />
              <span className='hidden md:block'>{data.logo.name}</span>  
            </Link>
             {/*<VideoUrlForm /> */}
            <div className="justify-self-end items-center justify-end grid grid-flow-col gap-3">
                <div className="w-fit">
                    <ModeToggle />
                </div>
                <Link className="justify-self-end w-fit mx-1   cursor-pointer rounded-sm hover:border-primary " href={"/dashboard"}>
                 
                 <Button variant="outline">dachboard</Button>
                </Link>
                <LoginLogoutButton />
            </div>
        </header>
    );
}
