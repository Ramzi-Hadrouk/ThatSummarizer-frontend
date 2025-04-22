"use client"
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { updateSummary } from "@/utils/functions/updateSummary";
import { useToast } from "@/hooks/use-toast";

interface Props {
  className?: string;
  summary_id: number;
  summary: string;
}

export default function UpdateSummaryButton({ className = "", summary_id, summary }: Props) {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      await updateSummary(summary_id, summary);
      toast({
        title: "Success",
        description: "Summary updated successfully.",
        variant:'success',
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      size="sm"
      className={cn("mt-2 justify-self-center text-xl", className)}
      onClick={handleClick}
    >
      <Save />
      <span className="mx-2">Save</span>
    </Button>
  );
}
