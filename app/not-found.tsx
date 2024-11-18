import Link from 'next/link'
import { headers } from 'next/headers'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
    const headersList = await headers()
    const domain = headersList.get('host')

    return (

        <section className="grid place-content-center   h-[100vh]">

            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-center   ">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl  text-center">Something's missing.</p>
            <p className="mb-4 text-lg font-light  text-center ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>

            <Link href="/" className=' w-fit  justify-self-center bg-primary text-primary-foreground hover:bg-yellow-300 p-4 font-bold  rounded-md'>  Back to Home page  </Link>

        </section>


    )
}