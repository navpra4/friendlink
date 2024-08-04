import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "./mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DeletePostDialogProps {
    post: PostData;
    open : boolean;
    onClose : ()=> void;
}

export default function DeletePostDialog ({
    post,
    open,
    onClose,
}: DeletePostDialogProps){

    const mutation = useDeletePostMutation();

    function handleOpenChange(open: boolean){
        if(!open || !mutation.isPending){
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete post?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant='destructive'
                        onClick={()=> mutation.mutate(post.id, {
                            onSuccess: onClose
                        })}
                    >
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 rounded-full"/>}
                        Delete
                    </Button>
                    <Button variant='outline' onClick={onClose} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}