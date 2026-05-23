"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(2, "Add a short subject"),
  message: z.string().min(10, "Tell me a bit more about your project"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const [status, setStatus] = useState<null | "ok" | "error">(null);

  const onSubmit = async (values: FormValues) => {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input placeholder="Your name" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-accent-coral">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input type="email" placeholder="your@email.com" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-xs text-accent-coral">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <Input placeholder="Subject" {...register("subject")} />
        {errors.subject && (
          <p className="mt-1 text-xs text-accent-coral">{errors.subject.message}</p>
        )}
      </div>
      <div>
        <Textarea placeholder="Tell me about your project…" rows={5} {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-accent-coral">{errors.message.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Send message
        </Button>
        {status === "ok" && (
          <p className="text-sm text-accent-teal">
            Thanks! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-accent-coral">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
