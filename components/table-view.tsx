import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import DeleteSummaryButton from './delete-summary-button'; 

interface DataItem {
  id: number
  attributes: {
    title: string
    description: string
    date: string,
    video_id: string,
    category: string
  }
}

function getFirstTwoLines(text: string): string {
  const words = text.trim().split(/\s+/);
  const first25 = words.slice(0, 18);
  return first25.join(' ') + " . . .";
}
interface CardViewProps {
  data?: DataItem[];
  currentstate:number,
  setCurrentstate: (number: number) => void;
}
export default function TableView({ data = [],currentstate, setCurrentstate }: CardViewProps) {
  return (
    <div className="mb-6 overflow-x-auto w-full"> {/* Existing responsive container */}
      <Table className="min-w-full"> {/* Existing table classes */}
        <TableHeader>
          <TableRow className="text-sm sm:text-base"> {/* Existing text responsiveness */}
            {/* Column Headers with existing and corrected responsiveness classes */}
            <TableHead className="w-[86%] md:w-[20%]">Title</TableHead>
            <TableHead className="w-[40%] hidden lg:table-cell">Description</TableHead> {/* Hidden below lg */}
            <TableHead className="w-[15%] xl:w-[10%] hidden md:table-cell">Date</TableHead> {/* Hidden below md */}
            {/* Corrected: Hide Category header below md to match the data cell */}
            <TableHead className="w-[7%] hidden md:table-cell">ategory</TableHead> {/* Hidden below md */}
            <TableHead className="w-[7%] ">Action</TableHead> {/* Always visible */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="text-sm sm:text-base"> {/* Existing text responsiveness */}
              {/* Table Cells matching headers, preserving original classes */}
              <TableCell className="font-medium">{item.attributes.title}</TableCell> {/* Existing classes */}
              <TableCell className="max-w-[300px] hidden lg:table-cell"> {/* Existing classes and responsiveness */}
                {getFirstTwoLines(item.attributes.description)}
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.attributes.date}</TableCell> {/* Existing classes and responsiveness */}
              {/* Correctly place Category data cell with its existing hidden md class */}
              <TableCell className="hidden md:table-cell font-bold text-xs"> {item.attributes.category} </TableCell> {/* Existing classes and responsiveness */}
              {/* Action cell - always visible, original classes (none specified on cell) */}
              <TableCell className=" justify-self-end p-1 grid grid-cols-[auto_auto] justify-end gap-2 ">
                <Button    variant="outline">
                  <Link href={`dashboard/summary/${item.attributes?.video_id}`}>

                    Read More

                  </Link>
                </Button >
                <DeleteSummaryButton SummaryId={item.id} currentstate={currentstate} setCurrentstate={setCurrentstate}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
