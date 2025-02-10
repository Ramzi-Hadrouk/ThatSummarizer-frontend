'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/modeToggle';
import type { Footer } from '@/utils/interfaces/types';
import Link from 'next/link';
import VideoUrlForm from '@/components/video-url-form'
import LoginLogoutButton from './login-logout-button';
export default function Header({ data }: { data: Footer }) {  
    

   
    return (
        <header className='w-[100%] bg-popover justify-between sticky z-10 top-0 grid grid-flow-col px-2 py-1 gap-3'>
            <Link className="justify-self-start w-fit font-medium py-1" href={data.logo.url}>
                {data.logo.name}
            </Link>
             {/*<VideoUrlForm /> */}
            <div className="justify-self-end items-center justify-end grid grid-flow-col gap-3">
                <div className="w-fit">
                    <ModeToggle />
                </div>
                <LoginLogoutButton />
            </div>
        </header>
    );
}
