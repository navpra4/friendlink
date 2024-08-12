import { CommentData } from "@/lib/types";
import { useDeleteCommentMutation } from "./mutations";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DeleteCommentDialogProps {
    comment : CommentData;
    open: boolean;
    onClose: ()=> void;
}

export default function DeleteCommentDialog({
    comment,
    open,
    onClose,
  }: DeleteCommentDialogProps) {
    const mutation = useDeleteCommentMutation();
  
    function handleOpenChange(open: boolean) {
      if (!open || !mutation.isPending) {
        onClose();
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete comment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            >
              {mutation.isPending && <Loader2 className="animate-spin mr-2"/>}
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }