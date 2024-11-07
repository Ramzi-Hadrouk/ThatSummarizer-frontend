import Link from 'next/link'
import { headers } from 'next/headers'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
    const headersList = await headers()
    const domain = headersList.get('host')

    return (
        <div className='grid place-content-center h-[100vh]   '>


            <section className='shadow-card-foreground shadow-sm rounded-lg' >
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6  rounded-lg">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl    ">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl">Something's missing.</p>
                        <p className="mb-4 text-lg font-light ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <Link href="/" className=' bg-primary text-primary-foreground hover:bg-yellow-300 h-10 px-4 py-2  rounded-md'>  Back to Home page  </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}