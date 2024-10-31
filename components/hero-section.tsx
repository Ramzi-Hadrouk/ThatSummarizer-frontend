import Link from "next/link";
import { Button } from "./ui/button";
import { HeroSection } from "@/utils/interfaces/types";

 function   HeroSection({data}: { data: HeroSection } ) { 

    const { heading, subheading } = data;
    const link = data.link?.[0] || {};
    const { name, url } = link;
    const imageURL = data.image?.data?.attributes?.url || "default-image-url";

     return (
        <div className="items-center w-10/12 grid-cols-2 mx-auto p-20 bg-background my-5 rounded-3xl overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5" data-aos="fade-right" data-aos-duration="800">
            <div className="pr-2 md:mb-14 py-14 md:py-0">
                <h1 className="text-3xl font-semibold  text-foreground xl:text-5xl lg:text-3xl">
              { heading}
                </h1>
                <p className="py-4 text-lg text-muted-foreground  2xl:py-8 md:py-6 2xl:pr-5">
                {subheading}
                </p>
                <Link className="mt-4  " href={url}>
                    <Button   className="rounded-xl" size={"lg"}>{name} </Button>
                </Link>
            </div>

            <div className="pb-10   overflow-hidden md:p-10 lg:p-0 sm:pb-0 rounded-lg">
                <img id="heroImg1" className="transition-all w-[500px]   drop-shadow-custom h-[500px] object-contain duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0" 
                src={process.env.BASE_URL+imageURL} 
                alt="Awesome hero page image" 
                  />
            </div>
        </div>
    )
}

export default HeroSection;
