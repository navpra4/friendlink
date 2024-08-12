"use client"

import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import PlaceHolder from "@tiptap/extension-placeholder"
import { submitPost } from "./actions"
import UserAvatar from "@/components/UserAvatar"
import { useSession } from "@/app/(main)/SessionProvider"
import { Button } from "@/components/ui/button"
import "./styles.css"
import { useSubmitPostMutation } from "./mutations"
import { Loader2 } from "lucide-react"

const PostEditor = () => {
    const {user} = useSession();

    const mutation = useSubmitPostMutation();

    const editor = useEditor({
        extensions:[
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            PlaceHolder.configure({
                placeholder: "What's crack-a-lacking?"
            }),
            
        ],
        immediatelyRender: false,
    })

    const input = editor?.getText({
        blockSeparator:"\n",
    }) || "";

    function onSubmit() {
        mutation.mutate({
            content: input,
            mediaIds: [],
        },{
            onSuccess: ()=>{
                editor?.commands.clearContent();
            },
        })
        
    }

    return (
        <div className=" flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex gap-5">
                <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline"/>
                <EditorContent
                 editor={editor}
                 className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3"
                />
            </div>

            <div className=" flex justify-end">
                <Button
                    onClick={onSubmit}
                    disabled = {!input.trim()}
                    className="min-w-20"
                >   
                    {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 rounded-full"/>}
                    Post
                </Button>
            </div>
        </div>
    )
}

export default PostEditor