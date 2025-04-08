/*import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface DataItem {
  id: number
  title: string
  description: string
  date: string
 
}

interface CardViewProps {
  data: DataItem[]
  view: "card" | "table"
}

export default function CardView({ data, view }: CardViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6  ">
      {data.map((item) => (
        <Card key={item.id} className="flex flex-col border-spacing-1 border">
         
          <CardHeader>
           
            <CardTitle className="flex justify-between items-start">
              <span>{item.title}</span>
             </CardTitle>

          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-fit justify-self-end" variant="outline">
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

*/


"use client"
import Link from 'next/link';
import LoadingItem from '@/components/loading-Item' ;
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch"
import { useEffect, useState } from "react"
import { PaginationDemo } from '@/components/Pagination-demo';
interface DataItem {
  id: number
  attributes: {
    title: string
    description: string
    date: string,
    video_id: string
  }
}
interface metaDataType {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number|1,
    total: number
  } }

function getFirstTwoLines(text: string): string {
  const words = text.trim().split(/\s+/); // split on any whitespace
  const first25 = words.slice(0, 25);
  return first25.join(' ');
}


export default function CardView() {
  const [data, setData] = useState<DataItem[]>([])
  const [metaData , setMetaData]=useState<metaDataType>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const TOTAL_PAGES:number = metaData?.pagination?.pageCount // or get it from your data

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Optionally fetch new data here
  }
  //http://localhost:1337/api/summaries/?pagination[page]=2&pagination[pageSize]=5&sort[0]=createdAt:desc
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary: { data: DataItem[] , meta:metaDataType } = await enhancedFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337"}/api/summaries/?pagination[page]=2&pagination[pageSize]=5&sort[0]=createdAt:desc`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            timeout: 20000,
          },
          ResponseType.JSON
        )
        setData(summary.data)
        setMetaData(summary.meta)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)return (<LoadingItem fontSize="text-2xl"/>)
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {data.map((item) => (
        <Card key={item.id} className="flex flex-col border-spacing-1 border">
          <CardHeader>
            <CardTitle className="flex justify-between text-xl items-start">
              <span>{item.attributes?.title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">{getFirstTwoLines(item.attributes?.description)}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>{item.attributes?.date}</span>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-fit justify-self-end p-0" variant="outline">
              <Link href={`/video/${item.attributes?.video_id}`} className='p-3 rounded-md'>
                Read More
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
       <PaginationDemo
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </div>
  )
}