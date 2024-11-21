"use client"
import { Button } from "@/components/ui/button"
import { SquareChevronLeft } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


function SignIn() {
    return (
        <div className=''>
            <Card className="w-[500px]  border-[1px]">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                    <Link href={'/'}  className="text-md font-normal">    <SquareChevronLeft /> </Link>
                        SignIn
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>

                    {/*----------Form------------- */}
                    <form>
                        <div className="grid w-full items-center gap-4">
                            {/*-- Email input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="name" placeholder="Email" />
                            </div>
                            {/*-- Password input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input type="password" id="name" placeholder="Password" />
                            </div>
                        </div>
                    </form>
                    {/*----------end Form------------- */}

                </CardContent>
                <CardFooter className="grid    gap-y-5" >
                    <div className="grid grid-flow-col  w-full justify-evenly">
                        
                        
                        <Button>SignIn</Button>
                    </div>

                    <p className="text-center">
                        Dont have an Account ?
                        <Link href={'/signup'} className="text- underline px-5">SignUp</Link>
                    </p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default SignIn
