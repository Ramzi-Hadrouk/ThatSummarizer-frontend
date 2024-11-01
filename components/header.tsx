import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/modeToggle';

function Header() {
    return (
        <header className=' w-[100%] border-b sticky top-0 grid grid-flow-col px-2 py-1  gap-3'>
            
            <div className="  justify-self-start w-fit"> Ai summerize </div>
            
            <div className="justify-self-end  justify-end  grid grid-flow-col gap-3">
                <div className=" w-fit">  <ModeToggle/></div>
                <Button size={'sm'} >login</Button>
            </div>

        </header>
    )
}

export default Header;
