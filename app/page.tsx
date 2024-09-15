 import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button"
import ApiService from "@/lib/api/api-service-class";
 export default async  function Home() {

  const api=new ApiService() ;
  const queryObject={
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"]
          },
          link: {
            populate: true
          }
        }
      }
    },
  }
  const data= await api.getData('/api/home-page',queryObject ,false)

  const{title ,description }=data.data?.attributes ;
  
  return (
   <>
    <HeroSection data={data}/> 

     

   </>
  );
}
