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
import updateProfileServerAction from "@/auth-logic/update-profile/update-profile-server-action";



function UpdateProfileForme() {

    let INISIAL_STATE = {
        data: null,
        validation_errors: null,
        is_updated: { state: "", error: "" },
    }

    const { toast } = useToast()

    const [formState, formAction] = useFormState(updateProfileServerAction, INISIAL_STATE)

    //if there is an error return toast
    useEffect(() => {

        if (formState.is_updated?.state === "no" && formState.validation_errors === null) {
            toast({
                variant: "destructive",
                title: "Wrong ! ",
                description: `${formState.is_updated.error.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        }

    }, [formState]);


    //console.dir(formState)

    return (
        <div className=''>
            <Card className="w-full  border">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                        <Link href={'/'} className="text-md text-muted-foreground w-fit  hover:text-foreground">    <Home /> </Link>
                        Update
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>

                    {/*----------Form------------- */}
                    <form action={formAction} >
                        <div className="grid w-full    md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/*-- Username input --*/}
                            <input type="number" name="id" hidden value={228} />
                            <div className=" ">
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
                            <div className=" ">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                />
                                <span className="text-red-500 text-sm">{formState.validation_errors?.email ? formState.validation_errors?.email[0] : null}</span>
                            </div>
                            {/*-- First Name input --*/}
                            <div className="">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    placeholder="Firstname"
                                    name="firstname"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.firstName ? formState.validation_errors?.firstName[0] : null}
                                </span>
                            </div>

                            {/*-- Last Name input --*/}
                            <div className="">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    placeholder="Lastname"
                                    name="lastname"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.lastName ? formState.validation_errors?.lastName[0] : null}
                                </span>
                            </div>
                            <div className="lg:col-span-3  md:col-span-2 grid justify-center bg-red-50">
                                <Button type="submit" className="w-fit px-8">Update</Button>
                            </div>
                        </div>


                    </form>
                    {/*----------end Form------------- */}

                </CardContent>
                <CardFooter className="grid    gap-y-5" >

                    <p className="text-center">

                        <Link href={'/login'} className="text- underline px-5"> </Link>
                    </p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default UpdateProfileForme;
