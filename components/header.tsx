import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/modeToggle';
import type { Footer } from '@/utils/interfaces/types';
import Link from 'next/link';


async function Header({ data }: { data: Footer }) {
    //------------ queryObject of fetching main page data

    return (
        <header className=' w-[100%]  sticky shadow-card-foreground shadow-sm z-10 top-0 grid grid-flow-col px-2 py-1  gap-3 bg-background'>

            <Link className="  justify-self-start w-fit font-medium py-1" href={data.logo.url}>{data.logo.name}</Link>

            <div className="justify-self-end  justify-end  grid grid-flow-col gap-3">
                <div className=" w-fit "> <ModeToggle /></div>

                <Link className=" py-1  border  rounded-md px-3 align-middle font-medium  " href={data.button.url}>{data.button.name}</Link>
            </div>

        </header>
    )
}

export default Header;
