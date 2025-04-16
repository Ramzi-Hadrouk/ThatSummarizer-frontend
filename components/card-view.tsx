"use client"
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface DataItem {
  id: number
  attributes: {
    title: string
    description: string
    date: string,
    video_id: string
  }
}


function getFirstTwoLines(text: string): string {
  const words = text.trim().split(/\s+/); // split on any whitespace
  const first25 = words.slice(0, 18);
  return first25.join(' ');
}

export default function CardView({ data = [] }: { data?: DataItem[] }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {
        data.map((item) => (
          <Card key={item.id} className="flex  flex-col border-spacing-1 border-[#4444] border">
            <CardHeader>
              <CardTitle className="flex justify-between text-md sm:text-xl font-medium items-start">
                <span>{item.attributes?.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-muted-foreground ">{getFirstTwoLines(item.attributes?.description)}</p>
              <div className="flex items-center gap-2 text-sm text-foreground mt-3">
                <Calendar className="h-5 w-4" />
                <span className=''>{item.attributes?.date}</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-fit justify-self-end p-0" variant="outline">
                <Link href={`dashboard/summary/${item.attributes?.video_id}`} className='p-3 rounded-md'>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

    </div>
  )
}