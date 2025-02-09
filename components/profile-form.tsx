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
import { useEffect, useState } from 'react';
import Link from "next/link"
import { useFormState } from "react-dom";
import updateProfileServerAction from "@/auth-logic/update-profile/update-profile-server-action";
import { Textarea } from "@/components/ui/textarea"

const INITIAL_STATE = {
    data: null,
    validation_errors: null,
    is_updated: { state: "", error: "" },
};

function UpdateProfileForm() {
    const [userInfo, setUserInfo] = useState(null);
    const { toast } = useToast();
    const [formState, formAction] = useFormState(updateProfileServerAction, INITIAL_STATE);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/auth/check', {
                    signal: abortController.signal
                });
                const auth = await response.json();
                
                if (auth.isValid) {
                    setUserInfo(auth.data);
                }
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();

        return () => abortController.abort();
    }, []);

    useEffect(() => {
        if (formState.is_updated?.state === "no" && !formState.validation_errors) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: formState.is_updated.error.message,
                action: <ToastAction altText="Try again">Undo</ToastAction>,
            });
        }
         if (formState.is_updated?.state === "yes"){
        toast({
            title: "Your information updated.",
            className:'bg-green-100 text-black '
          })}

    }, [formState.is_updated, formState.validation_errors, toast]);

    return (
        <div className=''>
            <Card className="w-full border ">
                <CardHeader>
                    <CardTitle className="grid gap-4">
                        <Link href="/" className="text-md text-muted-foreground w-fit hover:text-foreground">
                            <Home />
                        </Link>
                        Update
                    </CardTitle>
                    <CardDescription>Enter your details to sign into your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
                            <input type="number" name="id" hidden value={userInfo?.id || ''} />
                            
                            <div className="">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    name="username"
                                    readOnly
                                    value={userInfo?.username || ''}
                                    className="text-muted-foreground font-bold"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.username?.[0]}
                                </span>
                            </div>

                            <div className="">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    readOnly
                                    value={userInfo?.email || ''}
                                    className="text-muted-foreground font-bold"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.email?.[0]}
                                </span>
                            </div>

                            <div className="">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    placeholder="Firstname"
                                    name="firstname"
                                    defaultValue={userInfo?.firstname || ''}
                                    className="bg-background"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.firstName?.[0]}
                                </span>
                            </div>

                            <div className="">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    placeholder="Lastname"
                                    name="lastname"
                                    defaultValue={userInfo?.lastname || ''}
                                    className="bg-background"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.lastName?.[0]}
                                </span>
                            </div>

                            <div className="lg:col-span-3 md:col-span-2 ">
                                <Label htmlFor="lastname">Bio</Label>
                                <Textarea
                                    
                                    id="bio"
                                    placeholder="Tell us a little bit about yourself"
                                    name="bio"
                                    defaultValue={userInfo?.bio || ''}
                                    className="bg-background"
                                />
                                <span className="text-red-500 text-sm">
                                    {formState.validation_errors?.bio?.[0]}
                                </span>
                            </div>
                            <div className="lg:col-span-3 md:col-span-2 grid justify-center">
                                <Button type="submit" className="w-fit px-8">
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="grid gap-y-5">
                    <p className="text-center">
                        <Link href="/login" className="text- underline px-5"></Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default UpdateProfileForm;