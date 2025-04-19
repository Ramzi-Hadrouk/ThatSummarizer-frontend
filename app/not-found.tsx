import Link from 'next/link';
import { headers } from 'next/headers';
import { House } from 'lucide-react'; // Assuming lucide-react is installed
import Image from 'next/image';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default async function NotFound() {
 return (
    <div className="flex min-h-screen flex-col items-center  justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        {/* Improved Image handling with a placeholder background */}
        <div className="mx-auto mb-8 w-fit h-fit dark:bg-white  rounded-full items-center justify-center">
           <Image
            src="/avatars/not-found-avatar.png"
            alt="Page Not Found" // More descriptive alt text
            width={250}
            height={250}
            className="object-cover" // Style to cover the container
            priority
          />
        </div>

  

        <p className="mb-8 text-lg font-medium text-muted-foreground ">
          Sorry, we can't find the page you're looking for. It might have been moved or deleted.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-4 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <House className="mr-3 h-5 w-5" /> {/* Added margin for spacing */}
          Back to Home
        </Link>
      </div>
    </div>
  );
}