 'use client'
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
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useEffect } from 'react';

import Link from "next/link"
import { useFormState } from "react-dom";
import loginServerAction from "@/auth-logic/login/login-server-action ";


function Login() {
    let INISIAL_STATE = {
        data: null,
        validation_errors: null,
        is_logged: { state: "", error: "" },
    }

    const { toast } = useToast()

    const [formState, formAction] = useFormState(loginServerAction, INISIAL_STATE)

    //if there is an error return toast
    useEffect(() => {

        if (formState.is_logged?.state === "no" && formState.validation_errors===null) {
            toast({
                variant: "destructive",
                title: "Wrong ! ",
                description: `${formState.is_logged.error?.error?.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        }

    }, [formState]);
    return (
        <div className=''>
            <Card className="md:w-[500px]  border-[1px]">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                    <Link href={'/'} className="text-md text-muted-foreground w-fit  hover:text-foreground">    <Home/> </Link>

                        Login
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>

                    {/*----------Form------------- */}
                    <form action={formAction}>
                        <div className="grid w-full items-center gap-4">
                        
                            {/*-- Email input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                />
                                <span className="text-red-500 text-sm">{formState.validation_errors?.email ? formState.validation_errors?.email[0] : null}</span>
                            </div>
                            {/*-- Password input --*/}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="txt"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                />
                                <span className="text-red-500 text-sm">{formState.validation_errors?.password ? formState.validation_errors?.password[0] : null}</span>

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
