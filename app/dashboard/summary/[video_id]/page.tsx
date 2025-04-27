'use client'

import { YouTubePlayer } from "@/components/youtube-player"
import { NewRichTextEditor } from "@/components/new-rich-text-editor"
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch"
import { useEffect, useState } from "react"
import { htmlToMarkdown } from "@/utils/functions/html-to-markdown"
import { markdownToHtml } from "@/utils/functions/markdown-to-html"
import UpdateSummaryButton from "@/components/update-summary-button"

// types
interface DataItem {
  id: number
  attributes: {
    video_id: string
    title: string
    summary: string
    author_id: number | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    date: string
    description: string
    category: string
  }
}

interface ApiResponse {
  isValid: boolean
  data: any
  error: string | null
  token?: string
}

// helpers
async function checkAuth(): Promise<string> {
  const response = await fetch("/api/auth/check")
  if (!response.ok) {
    throw new Error(`Auth check failed with status ${response.status}`)
  }
  const data: ApiResponse = await response.json()
  if (!data.token) {
    throw new Error("No auth token received")
  }
  return data.token
}

async function fetchSummary(video_id: string, token: string): Promise<DataItem | undefined> {
  const baseUrl = process.env.BASE_URL || "http://localhost:1337"
  const url = `${baseUrl}/api/summaries?filters[video_id][$eq]=${video_id}`

  const response = await enhancedFetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    },
    ResponseType.JSON
  )

  return response?.data?.[0]
}

async function convertMarkdownToHtml(markdown: string): Promise<string> {
  return await markdownToHtml(markdown || '')
}

// main component
export default function Page({ params }: { params: { video_id: string } }) {
  const { video_id } = params
  const [fetchedData, setFetchedData] = useState<DataItem>()
  const [initialHtml, setInitialHtml] = useState<string>('')
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('')

  useEffect(() => {
    async function initializePage() {
      try {
        const token = await checkAuth()
        const data = await fetchSummary(video_id, token)

        if (data) {
          setFetchedData(data)
          setCurrentMarkdown(data.attributes.summary || '')
          const html = await convertMarkdownToHtml(data.attributes.summary)
          setInitialHtml(html)
        }
      } catch (error) {
        console.error("Error initializing page:", error)
      }
    }

    initializePage()
  }, [video_id])

  return (
    <main className="lg:px-8 md:w-[calc(w-full-16em)] bg-sidebar h-full p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-10 gap-3 py-4">
        <div className="col-span-10 lg:col-span-7 grid">
          <NewRichTextEditor
            initialContent={initialHtml}
            onChange={(html) => setCurrentMarkdown(htmlToMarkdown(html))}
            className="prose max-w-none border border-gray-200 rounded-md shadow-sm"
          />
          <UpdateSummaryButton 
            summary_id={fetchedData?.id} 
            summary={currentMarkdown} 
          />
        </div>
        <div className="col-span-3 hidden lg:inline justify-center">
          <YouTubePlayer
            video_Id={video_id}
            title={fetchedData?.attributes?.title || ''}
            className="justify-self-center"
          />
        </div>
      </div>
    </main>
  )
}
