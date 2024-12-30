'use client '
import { cookies } from 'next/headers'
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { Button } from './ui/button'

function loginLogoutButton() {
    const [jwt, setJwt] = useState<string | undefined>(cookies().get('jwt')?.value);

    useEffect(() => {
        const handleCookieChange = () => {
            const newJwt = cookies().get('jwt')?.value;
            if (newJwt !== jwt) {
                setJwt(newJwt);
            }
        };

        // Custom event to track cookie changes
        const intervalId = setInterval(handleCookieChange, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [jwt]);

    return (
        <>
            {!jwt ? (
                <Link href="/login">
                    <Button variant="outline">Login</Button>
                </Link>
            ) : (
                <Link href="/">
                    <Button variant="outline">Logout</Button>
                </Link>
            )}
        </>
    )


}

export default loginLogoutButton 
