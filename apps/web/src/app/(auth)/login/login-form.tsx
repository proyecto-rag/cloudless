"use client";

import { useActionState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { LoginFormState, loginAction } from "./login-action";

const initialLoginFormState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialLoginFormState,
  );

  return (
    <CardContent className="pt-5">
      <form
        className="space-y-4"
        action={formAction}
        aria-busy={isPending}
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
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-9 border-slate-700 bg-slate-950/50 pl-8 text-slate-100 placeholder:text-slate-500 focus-visible:border-slate-500"
                  autoComplete="email"
                  aria-invalid={!!state.fieldErrors?.email}
                />
              </div>
              {state.fieldErrors?.email ? (
                <p className="text-destructive text-sm">{state.fieldErrors.email}</p>
              ) : null}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-slate-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  className="h-9 border-slate-700 bg-slate-950/50 pl-8 text-slate-100 placeholder:text-slate-500 focus-visible:border-slate-500"
                  autoComplete="current-password"
                  aria-invalid={!!state.fieldErrors?.password}
                />
              </div>
              {state.fieldErrors?.password ? (
                <p className="text-destructive text-sm">
                  {state.fieldErrors.password}
                </p>
              ) : null}
            </FieldContent>
          </Field>
        </FieldGroup>

        {state.message ? (
          <p
            role="alert"
            className="rounded-md border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300"
          >
            {state.message}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="h-9 w-full bg-slate-100 text-slate-950 hover:bg-slate-200"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? "Verifying credentials..." : "Log in"}
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </CardContent>
  );
}
