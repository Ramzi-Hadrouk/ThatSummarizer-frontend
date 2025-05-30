"use client"
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DeleteSummaryButton from './delete-summary-button'; 
interface DataItem {
  id: number
  attributes: {
    title: string
    description: string
    date: string,
    video_id: string ,
    category : string 
  }
}


function getFirstTwoLines(text: string): string {
  const words = text.trim().split(/\s+/); // split on any whitespace
  const first25 = words.slice(0, 18);
  return first25.join(' ');
}

interface CardViewProps {
  data?: DataItem[];
  currentstate:number,
  setCurrentstate: (number: number) => void;
}

export default function CardView({ data = [],currentstate, setCurrentstate }: CardViewProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {
        data.map((item) => (
          <Card key={item.id} className="flex  flex-col border-spacing-1 border-[#4444] border">
            <CardHeader>
              <CardTitle className="flex justify-between text-md sm:text-xl font-medium items-start">
                <span>{item.attributes?.title}</span>
                <Badge variant="secondary">{item.attributes?.category}</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-muted-foreground ">{getFirstTwoLines(item.attributes?.description)}</p>
              <div className="flex items-center gap-2 text-sm text-foreground mt-3">
                <Calendar className="h-5 w-4" />
                <span className=''>{item.attributes?.date}</span>
              </div>
            </CardContent>

            <CardFooter className='grid grid-cols-[auto_auto] justify-end gap-2 w-full'>
              <Button className="w-fit  -end" variant="outline">
                <Link href={`dashboard/summary/${item.attributes?.video_id}`} className='p-3'>
                  Read More
                </Link>

              </Button>
              <DeleteSummaryButton SummaryId={item.id} currentstate={currentstate} setCurrentstate={setCurrentstate} />
            </CardFooter>
          </Card>
        ))}
         
    </div>
  )
}