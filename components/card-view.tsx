import { Button } from "@/components/ui/button"
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

