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
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useEffect } from 'react';

import Link from "next/link"
import { useFormState } from "react-dom";
import registerUserAction from "@/server-actions/register-user-action";



function SignUp() {
    let INISIAL_STATE = {
        data: null,
        validation_errors: null,
        is_registered: { state: "", error: "" },
    }

    const { toast } = useToast()

    const [formState, formAction] = useFormState(registerUserAction, INISIAL_STATE)

    useEffect(() => {

        if (formState.is_registered?.state === "no" && formState.validation_errors===null) {
            toast({
                variant: "destructive",
                title: "Scheduled: Catch up ",
                description: `${formState.is_registered.error?.error?.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        }

    }, [formState]);


    //console.dir(formState)

    return (
        <div className=''>
            <Card className="md:w-[500px]  border">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                        <Link href={'/'} className="text-md text-muted-foreground w-fit  hover:text-foreground">    <Home /> </Link>
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
                                <span className="text-red-500 text-sm">{formState.validation_errors?.username ? formState.validation_errors?.username[0] : null}</span>
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
