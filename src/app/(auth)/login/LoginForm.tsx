"use client";

import { loginSchema, Loginvalues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoginForm = () => {

    const [error, setError] = useState<string>();

    const [isPending, startTransition] = useTransition()

    const form = useForm<Loginvalues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username:"",
            password:"",
        },
    });

    async function onSubmit(values: Loginvalues){
        setError(undefined);
        startTransition(async()=>{
            const {error} = await login(values);
            if(error) setError(error);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
                {error && <p className=" text-center text-destructive">{error}</p>}               
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                
                <Button type="submit" className="w-full" disabled = {isPending}>
                    Sign in
                    {isPending && (
                        <Loader2 className=" h-4 w-4 rounded-full animate-spin ml-1.5"/>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm