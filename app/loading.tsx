'use client'
import { LoaderCircle } from 'lucide-react';

export default function Loading() {
    return (

        <section className="grid place-content-center    h-[100vh]">

            <LoaderCircle  size={70}   strokeWidth={2} className="text-foreground" />
        </section>


    )
}