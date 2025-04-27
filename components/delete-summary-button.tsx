'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteSummary } from "@/utils/functions/delete-summary";
interface DeleteButtonProps {
  SummaryId: number;
  currentstate:number;
  setCurrentstate: (number: number) => void;
}


export default function DeleteSummaryButton({ SummaryId ,currentstate,setCurrentstate }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteSummary(SummaryId)

      if (!response.ok) {
        throw new Error("Failed to delete summary");
      }

      toast({
        title: "Success",
        description: "Summary deleted successfully.",
        variant:'success',
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting summary:", error);
      toast({
        title: "Error",
        description: "Failed to delete summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    setCurrentstate(currentstate+1);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        disabled={isLoading}
        className="w-fit  "
      >
        <Trash2  size={18} />
        
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
        <AlertDialogContent className="bg-popover">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              summary for video ID: {SummaryId}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}