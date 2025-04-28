
import ApiService from "@/utils/classes/api-service-class";
import  blockRenderer  from "@/utils/functions/block-renderer"; // Correct import path
import type { Block } from "@/utils/interfaces/types";
import  { homePageQuery } from "@/utils/objects/query-objects";

export default async function Home() {


  //------------ queryObject of fetching main page data
  const queryObject = homePageQuery

  const api = new ApiService();
  const data = await api.getData('/api/home-page', queryObject, false)


  const { title, description } = data.data?.attributes;

  return (
    <main className="h-svh">
     {data.data?.attributes?.blocks.map(( block: Block) => blockRenderer(block))}
     </ main>
  );
}
