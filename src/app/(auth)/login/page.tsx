import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[28rem] w-full max-w-[32rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10">
            <div className=" space-y-1 text-center">
                <h1 className=" text-3xl font-bold text-primary">
                    Login to FriendLink
                </h1>
                <p className=" text-muted-foreground">
                    A place where even <span className=" italic text-primary font-semibold">you</span> can find a friend.
                </p>
            </div>
            <div className=" space-y-5">
                <LoginForm/>
                <Link href='/signup' className="block text-center hover:underline">
                    Don&apos;t have an account? Sign up
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
