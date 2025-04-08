'use client'
import { useState } from 'react'
import VideoUrlForm from '@/components/video-url-form'
import CardView from "@/components/card-view"
import TableView from "@/components/table-view"
import ViewToggle from "@/components/view-toggel"
 

const data = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and its core concepts.",
    date: "2023-05-15",
    category: "Frontend",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Dive deep into TypeScript's advanced features and patterns.",
    date: "2023-05-18",
    category: "Programming",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Next.js Best Practices",
    description: "Explore best practices for building scalable Next.js applications.",
    date: "2023-05-20",
    category: "Web Development",
    author: "Alice Johnson",
  },
  {
    id: 4,
    title: "CSS Grid Mastery",
    description: "Master CSS Grid layout for complex web designs.",
    date: "2023-05-22",
    category: "CSS",
    author: "Bob Wilson",
  },
  {
    id: 5,
    title: "GraphQL Fundamentals",
    description: "Understand the core concepts of GraphQL and its benefits.",
    date: "2023-05-25",
    category: "API",
    author: "Charlie Brown",
  },
  {
    id: 6,
    title: "Responsive Web Design",
    description: "Learn techniques for creating responsive and mobile-friendly websites.",
    date: "2023-05-28",
    category: "Web Design",
    author: "Diana Miller",
  },
  {
    id: 7,
    title: "JavaScript Performance",
    description: "Optimize your JavaScript code for better performance.",
    date: "2023-05-30",
    category: "JavaScript",
    author: "Ethan Davis",
  },
  {
    id: 8,
    title: "UI/UX Principles",
    description: "Discover key principles for creating effective user interfaces.",
    date: "2023-06-02",
    category: "Design",
    author: "Fiona Taylor",
  },
]

function page() {
  const [view, setView] = useState<"card" | "table">("card")
  return (
    <main>
      <VideoUrlForm />

      <main className="container mx-auto px-4 py-8">

        <ViewToggle view={view} setView={setView} />
        <div className="bg-sidebar p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Summaries</h1>

          {view === "card" ? <CardView   /> : <TableView data={data} view={view} />}
        </div>

      </main>
    
    </main>






  )
}

export default page
