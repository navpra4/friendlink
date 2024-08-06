"use client";

import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
    user: UserData;
}

export default function EditProfileButton({user}: EditProfileButtonProps){
    const [showDialog, setShowDialog] = useState(false);
    
    return (
    <>
        <Button variant='outline' onClick={()=> setShowDialog(true)}>
            Edit Profile
        </Button>
        <EditProfileDialog open={showDialog} user={user} onOpenChange={setShowDialog}/>
    </>
    )
}