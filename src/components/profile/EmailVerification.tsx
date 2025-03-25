
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendEmailVerification, signUpWithEmail, signInWithEmail } from "@/lib/supabase";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmailVerificationProps {
  onSuccess?: (email: string) => void;
  initialEmail?: string;
}

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function EmailVerification({ onSuccess, initialEmail = "" }: EmailVerificationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialEmail,
      password: "",
    },
  });

  const handleVerification = async (values: z.infer<typeof emailSchema>) => {
    setIsSubmitting(true);
    
    try {
      console.log(`Attempting ${mode} with email: ${values.email}`);
      let result;
      
      if (mode === "signup") {
        result = await signUpWithEmail(values.email, values.password);
        console.log("Signup result:", result);
        
        if (result.error) {
          if (result.error.message.includes("already registered")) {
            toast.info("This email is already registered. Try signing in instead.");
            setMode("signin");
          } else {
            toast.error(result.error.message);
          }
        } else {
          toast.success("Verification email sent! Please check your inbox.");
          if (onSuccess) onSuccess(values.email);
        }
      } else {
        result = await signInWithEmail(values.email, values.password);
        console.log("Signin result:", result);
        
        if (result.error) {
          toast.error(result.error.message);
        } else {
          toast.success("Signed in successfully!");
          if (onSuccess) onSuccess(values.email);
        }
      }
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("An error occurred during verification");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerification = async () => {
    const email = form.getValues("email");
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Resending verification email to:", email);
      const result = await sendEmailVerification(email);
      console.log("Resend verification result:", result);
      
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Verification email resent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("An error occurred while resending the verification email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-md p-4 bg-card">
      <h3 className="text-lg font-medium mb-4">
        {mode === "signup" ? "Email Verification" : "Sign In"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerification)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll send a verification link to this email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center pt-2">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")} 
              className="px-0"
            >
              {mode === "signup" ? "Already have an account? Sign in" : "Need to create an account? Sign up"}
            </Button>
            
            <div className="space-x-2">
              {mode === "signup" && (
                <Button type="button" variant="outline" onClick={resendVerification} disabled={isSubmitting}>
                  Resend
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : mode === "signup" ? "Verify Email" : "Sign In"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
