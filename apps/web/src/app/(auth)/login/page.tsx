import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const registeredParam = resolvedSearchParams.registered;
  const showRegisteredMessage = Array.isArray(registeredParam)
    ? registeredParam.includes("1")
    : registeredParam === "1";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.1),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.75),rgba(2,6,23,0.95))]" />
      </div>

      <Card className="relative w-full max-w-md gap-0 rounded-2xl border border-slate-800 bg-slate-900/75 shadow-[0_20px_60px_-25px_rgba(2,6,23,0.8)] backdrop-blur">
        <CardHeader className="gap-2 border-b border-slate-800 pb-5">
          <p className="text-[0.7rem] font-medium tracking-[0.18em] text-slate-400 uppercase">
            Cloudless
          </p>
          <CardTitle className="font-geist-mono text-xl tracking-tight text-slate-100">
            Welcome back
          </CardTitle>
          <CardDescription className="max-w-sm text-slate-400">
            Sign in to continue to your workspace.
          </CardDescription>
        </CardHeader>

        {showRegisteredMessage ? (
          <div className="px-6 pt-4">
            <p
              role="status"
              className="flex items-center gap-2 rounded-md border border-emerald-900/60 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-300"
            >
              <CheckCircle2 className="size-3.5" />
              Account created successfully. You can now sign in.
            </p>
          </div>
        ) : null}

        <LoginForm />

        <CardFooter className="flex justify-end border-t border-slate-800 pt-4 text-[0.72rem] text-slate-400">
          <Link
            href="/register"
            className="font-medium text-slate-200 transition-colors hover:text-slate-100"
          >
            Create account
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
