import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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
  const first25 = words.slice(0, 25);
  return first25.join(' ');
}

 
export default function TableView({ data = [] }: { data?: DataItem[] }) {
  return (
    <div className="mb-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.attributes.title}</TableCell>
              <TableCell>{getFirstTwoLines(item.attributes.description)}</TableCell>
              <TableCell> <Badge variant="secondary">{item.attributes.date}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

