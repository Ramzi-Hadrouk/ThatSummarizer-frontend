import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
export async function POST(req: NextRequest) {
  

  try {
    const requestData = await req.json();
    print({location: 'summary-route',type:LogType.Information ,mss: 'received data:',data:requestData});
    

    return new Response(
      JSON.stringify({ data: "return from our handler", error: null }),
      {
        status: 200,
      }
    );
  }

  catch (error) {
    console.error("◼◼◼◼◼ summarize api ▶️ Error processing request:", error);
    print({location: 'summary-route',type:LogType.Error ,mss: JSON.stringify(error) });
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }


}