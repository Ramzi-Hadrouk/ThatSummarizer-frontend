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
import { useFormState } from "react-dom";
import registerUserAction from "@/server-actions/register-user-action";



function SignUp() {
    let INISIAL_STATE={
        data:null ,
        errors:null ,
        message : null ,
    }

    const [formState, formAction]=useFormState(registerUserAction,INISIAL_STATE)
    console.log(formState)
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
                    <form action={formAction}>
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
                                <span className="text-red-500 text-sm">{formState.errors?.username? formState.errors?.username[0] :null }</span>
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
                                <span className="text-red-500 text-sm">{formState.errors?.email? formState.errors?.email[0] :null }</span>
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
                                <span className="text-red-500 text-sm">{formState.errors?.password? formState.errors?.password[0] :null }</span>
                                
                            </div>
                       
                            <Button type="submit" className="w-fit px-8 justify-self-center">SignUp</Button>
                       
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
