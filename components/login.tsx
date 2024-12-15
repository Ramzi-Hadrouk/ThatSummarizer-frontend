"use client"
import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react';
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


function Login() {
    return (
        <div className=''>
            <Card className="w-[500px]  border-[1px]">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                    <Link href={'/'} className="text-md text-muted-foreground w-fit  hover:text-foreground">    <Home/> </Link>

                        Login
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>

                    {/*----------Form------------- */}
                    <form>
                        <div className="grid w-full items-center gap-4">
                            {/*-- Email input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" />
                            </div>
                            {/*-- Password input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input type="password" id="name" placeholder="Password" />
                            </div>
                            <Button type="submit" className="w-fit px-8 justify-self-center">Login</Button>
                        </div>
                    </form>
                    {/*----------end Form------------- */}

                </CardContent>
                <CardFooter className="grid    gap-y-5" >
                  

                    <p className="text-center">
                        Dont have an Account ?
                        <Link href={'/sign-up'} className="text- underline px-5">SignUp</Link>
                    </p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Login ;
