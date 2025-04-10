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
  const words = text.trim().split(/\s+/);
  const first25 = words.slice(0, 18);
  return first25.join(' ')+" . . .";
}

export default function TableView({ data = [] }: { data?: DataItem[] }) {
  return (
    <div className="mb-6 overflow-x-auto w-full">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="text-sm sm:text-base">
            <TableHead className="w-[93%] md:w-[20%]">Title</TableHead>
            <TableHead className="w-[40%] hidden lg:table-cell">Description</TableHead>
            <TableHead className="w-[15%]  xl:w-[10%] hidden md:table-cell">Date</TableHead>
            <TableHead className="w-[7%] ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="text-sm sm:text-base">
              <TableCell className="font-medium">{item.attributes.title}</TableCell>
              <TableCell className="max-w-[300px] hidden lg:table-cell">
                {getFirstTwoLines(item.attributes.description)}
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.attributes.date}</TableCell>
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
