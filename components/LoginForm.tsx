"use client";

import { useActionState, useEffect, useState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const initialState = { error: "", success: false };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-md mx-auto bg-black border-white/10 rounded-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="font-serif text-3xl text-white">Login</CardTitle>
        <CardDescription className="font-sans text-[10px] tracking-widest uppercase text-gray-500 mt-2">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="m@example.com" className="bg-transparent border-white/20 text-white rounded-sm focus-visible:ring-0 focus-visible:border-white/50 font-sans" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="bg-transparent border-white/20 text-white rounded-sm focus-visible:ring-0 focus-visible:border-white/50 font-sans pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-6 border-t border-white/5 mt-4">
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-sans tracking-widest uppercase text-xs rounded-sm transition-colors h-12" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <div className="text-[11px] text-center text-gray-500 font-sans tracking-wide mt-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white hover:underline underline-offset-4 decoration-1">
              Create one
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
