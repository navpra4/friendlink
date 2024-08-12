import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserData } from "@/lib/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "./mutations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Camera, FormInput, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import avatarPlaceholder from "@/assets/avatar-placeholder.png"
import Resizer from 'react-image-file-resizer'

interface EditProfileDialogProps {
    user: UserData;
    open: boolean;
    onOpenChange: (open: boolean)=> void;
}

export default function EditProfileDialog({
    user,
    open,
    onOpenChange,
}: EditProfileDialogProps){

    const form = useForm<UpdateUserProfileValues>({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            displayName: user.displayName,
            bio: user.bio || "",
        }
    })

    const mutation = useUpdateProfileMutation();

    const [imageToUpload, setImageToUpload] = useState<File>();

    async function onSubmit(values: UpdateUserProfileValues) {

        const newAvatarFile = imageToUpload ? new File([imageToUpload],`avatar_${user.id}.webp`)
        : undefined

        mutation.mutate({
            values,
            avatar: newAvatarFile,
        },{
            onSuccess: ()=>{
                onOpenChange(false);
                setImageToUpload(undefined);
            }
        })  
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-1.5">
                    <Label>Avatar</Label>
                    <AvatarInput src={user.avatarUrl || avatarPlaceholder} setImageToUpload={setImageToUpload}/>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Display name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your display name' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

interface AvatarInputProps {
    src: string | StaticImageData;
    setImageToUpload : (image : File)=> void
}

function AvatarInput({src, setImageToUpload}: AvatarInputProps){
    const fileInputRef = useRef<HTMLInputElement>(null);

    function onImageSelected(image: File | undefined){
        if(!image) return;

        Resizer.imageFileResizer(
            image,
            1024,
            1024,
            'WEBP',
            100,
            0,
            (uri)=> setImageToUpload(uri as File),
            "file",
        );

    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e)=> onImageSelected(e.target.files?.[0])}
                ref = {fileInputRef}
                className="hidden sr-only"
            />

            <button
                type="button"
                onClick={()=>fileInputRef.current?.click()}
                className="group relative block"
            >
                <Image
                    src={src}
                    alt="Avatar cover"
                    className="size-32 flex-none rounded-full object-cover"
                    width={150}
                    height={150}
                />
                <span className="absolute inset-0 m-auto flex size-1/2 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
                    <Camera size={24}/>
                </span>
            </button>
        </>
    )
}