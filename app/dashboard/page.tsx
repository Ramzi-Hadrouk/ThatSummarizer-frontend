'use client'
import LoadingItem from '@/components/loading-Item';
import VideoUrlForm from '@/components/video-url-form'
import CardView from "@/components/card-view"
import TableView from "@/components/table-view"
import ViewToggle from "@/components/view-toggel"
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch"
import { useEffect, useState } from "react"
import { PaginationDemo } from '@/components/Pagination-demo';

// types for data fetching 
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
    pageCount: number,
    total: number
  }
}

function page() {
  // use effects
  const [data, setData] = useState<DataItem[]>([])
  const [metaData, setMetaData] = useState<metaDataType>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState<"card" | "table">("card")
  

  let TOTAL_PAGES: number = metaData?.pagination?.pageCount || 1;

  const handlePageChange = (page: number) => { setCurrentPage(page) }
  //usefect for just fetch summaries from strapi backend 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary: { data: DataItem[], meta: metaDataType } = await enhancedFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337"}/api/summaries/?pagination[page]=${currentPage}&pagination[pageSize]=6&sort[0]=createdAt:desc`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            timeout: 20000,
          },
          ResponseType.JSON
        )
        setData(summary.data)
        setMetaData(summary.meta)
        TOTAL_PAGES = metaData?.pagination?.pageCount  || 1
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])
 
  return (
    <main >
      <VideoUrlForm/>
      <main >
        <ViewToggle view={view} setView={setView} />
        <div className="bg-sidebar p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Summaries</h1>
          {loading && <LoadingItem fontSize="text-2xl" />}
          {error && <div>Error: {error}</div>}
          {view === "card" ? <CardView data={data} /> : <TableView data={data}/>}
        <PaginationDemo
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
        </div>
      </main>

     
    </main>

  )
}

export default page
