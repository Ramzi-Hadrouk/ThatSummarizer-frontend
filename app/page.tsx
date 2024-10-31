
import ApiService from "@/utils/classes/api-service-class";
import  blockRenderer  from "@/utils/functions/block-renderer"; // Correct import path
import { Block } from "@/utils/interfaces/types";

export default async function Home() {


  //------------ queryObject of fetching main page data
  const queryObject = {
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"]
          },
          link: {
            populate: true
          }
          ,
          features: {
            populate: true
          }

        }
      }
    },
  }

  const api = new ApiService();
  const data = await api.getData('/api/home-page', queryObject, false)


  const { title, description } = data.data?.attributes;

  return (
    <>
     {data.data?.attributes?.blocks.map(( block: Block) => blockRenderer(block))}
     </>
  );
}
