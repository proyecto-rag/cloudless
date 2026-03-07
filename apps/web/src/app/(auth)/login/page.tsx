"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUserSchema, type LoginUserInput } from "@repo/shared/src/users";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginUserInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const statusMessage = form.formState.isSubmitSuccessful
    ? "Success, redirecting to your workspace..."
    : null;

  const onSubmit = async (values: LoginUserInput) => {
    form.clearErrors();
    const validationResult = loginUserSchema.safeParse(values);

    if (!validationResult.success) {
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0];
        if (fieldName === "email" || fieldName === "password") {
          form.setError(fieldName, { message: issue.message });
        }
      }
      return;
    }

    // Keep this in place as mock behavior while backend auth is not connected.
    console.info("Mock login payload", values);
    router.push("/");
  };

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

        <CardContent className="pt-5">
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-9 border-slate-700 bg-slate-950/50 pl-8 text-slate-100 placeholder:text-slate-500 focus-visible:border-slate-500"
                      autoComplete="email"
                      aria-invalid={!!form.formState.errors.email}
                      {...form.register("email")}
                    />
                  </div>
                  <FieldError errors={[form.formState.errors.email]} />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="password"
                      className="h-9 border-slate-700 bg-slate-950/50 pl-8 text-slate-100 placeholder:text-slate-500 focus-visible:border-slate-500"
                      autoComplete="current-password"
                      aria-invalid={!!form.formState.errors.password}
                      {...form.register("password")}
                    />
                  </div>
                  <FieldError errors={[form.formState.errors.password]} />
                </FieldContent>
              </Field>
            </FieldGroup>

            {statusMessage ? (
              <p
                role="status"
                className="flex items-center gap-2 rounded-md border border-emerald-900/60 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-300"
              >
                <CheckCircle2 className="size-3.5" />
                {statusMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="h-9 w-full bg-slate-100 text-slate-950 hover:bg-slate-200"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Verifying credentials..."
                : "Log in"}
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </CardContent>

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
