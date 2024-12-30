'use client'
import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/modeToggle';
import type { Footer } from '@/utils/interfaces/types';
import Link from 'next/link';
import loginLogoutButton from './login-logout-button';

async function Header({ data }: { data: Footer }) {
    //------------ queryObject of fetching main page data

    return (
        <header className='  w-[100%]    bg-popover     sticky    z-10 top-0 grid grid-flow-col px-2 py-1  gap-3 '>

            <Link className="  justify-self-start w-fit font-medium py-1" href={data.logo.url}>{data.logo.name}</Link>

            <div className="justify-self-end items-center justify-end  grid grid-flow-col gap-3">
                <div className=" w-fit "> <ModeToggle /></div>

               { /*<Link  href={data.button.url}>
                    <Button variant="outline"  className=''>{data.button.name}</Button>
                </Link>*/
                }

                <loginLogoutButton/> 
            </div>

        </header>
    )
}

export default Header;
