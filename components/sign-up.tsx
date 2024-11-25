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
import registerUserAction from "@/server-actions/register-user-action";

function SignUp() {
    return (
        <div className=''>
            <Card className="w-[500px]  border">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                        <Link href={'/'} className="text-md text-muted-foreground w-fit  hover:text-foreground">    <Home/> </Link>
                        SignUp
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>

                    {/*----------Form------------- */}
                    <form action={registerUserAction}>
                        <div className="grid w-full items-center gap-4">
                            {/*-- Username input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                   type="text"
                                    id="username"
                                    placeholder="Username"
                                    name="username"
                                />
                            </div>
                            {/*-- Email input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                />
                            </div>
                            {/*-- Password input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>
                       
                            <Button type="submit" className="w-fit px-8 justify-self-center">SignIn</Button>
                       
                        </div>
                

                    </form>
                    {/*----------end Form------------- */}

                </CardContent>
                <CardFooter className="grid    gap-y-5" >

                    <p className="text-center">
                        have an Account ?
                        <Link href={'/login'} className="text- underline px-5">Login</Link>
                    </p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default SignUp;
