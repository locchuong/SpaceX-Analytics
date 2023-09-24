import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError, UserCredential } from "firebase/auth";
import { useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";

import GithubLogo from "~/assets/logos/github.svg?react";
import GoogleLogo from "~/assets/logos/google.svg?react";

import { Button } from "~/components/button";
import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/input";
import { Separator } from "~/components/seperator";

import { firebaseAuth } from "~/config/firebase";

import { convertErrorCodeToUserMessage } from "~/features/auth/constants/auth-errors";

import { Link, useNavigate } from "~/router";

const formSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
});

enum ErrorSource {
  EmailProvider,
  GoogleProvider,
  GithubProvider,
}

function LoginForm() {
  const navigate = useNavigate();

  // Auth Providers
  const [signInWithEmailAndPassword, , , emailError] = useSignInWithEmailAndPassword(firebaseAuth);
  const [signInWithGoogle, , , googleError] = useSignInWithGoogle(firebaseAuth);
  const [signInWithGithub, , , githubError] = useSignInWithGithub(firebaseAuth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // Transforms errors from OAuth Providers into one
  const [errorSource, setErrorSource] = React.useState<ErrorSource>(ErrorSource.EmailProvider);
  const formError = React.useMemo<AuthError | undefined>(() => {
    if (errorSource === ErrorSource.GoogleProvider) {
      return googleError;
    }
    if (errorSource === ErrorSource.GithubProvider) {
      return githubError;
    }
    return emailError;
  }, [errorSource, googleError, githubError, emailError]);

  function onAuthFulfilled(user: UserCredential | undefined) {
    if (user) {
      navigate("/");
    }
  }

  function handleSignInWithEmailAndPassword(values: z.infer<typeof formSchema>) {
    setErrorSource(ErrorSource.EmailProvider);
    signInWithEmailAndPassword(values.email, values.password).then(onAuthFulfilled);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.handleSubmit(handleSignInWithEmailAndPassword)(e);
  }

  function handleSignInWithGoogle() {
    setErrorSource(ErrorSource.GoogleProvider);
    signInWithGoogle().then(onAuthFulfilled);
  }

  function handleSignInWithGithub() {
    setErrorSource(ErrorSource.GithubProvider);
    signInWithGithub().then(onAuthFulfilled);
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="min-h-[548px]">
        {/* Header */}
        <h1 className="mb-2 text-2xl font-medium tracking-wider">LOGIN</h1>
        <p className="mb-6 text-sm text-zinc-500">Please enter your email and password:</p>
        <div className="space-y-6">
          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              {formError?.code && <FormError>{convertErrorCodeToUserMessage(formError?.code)}</FormError>}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormLabel>Password</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link className="mb-4 mt-1 block w-fit text-sm text-zinc-500 hover:underline" to="/forgot-password">
                Forgot Password?
              </Link>
              <Button className="w-full" type="submit">
                LOGIN
              </Button>
            </form>
          </Form>
          {/* Divider */}
          <div className="flex flex-row items-center">
            <Separator className="flex-1" orientation="horizontal" />
            <p className="mx-6 text-xs text-slate-500">OR</p>
            <Separator className="flex-1" orientation="horizontal" />
          </div>
          {/* Social Login */}
          <div className="flex flex-col gap-3">
            <Button className="group relative hover:bg-google" type="button" variant="outlined" onClick={() => handleSignInWithGoogle()}>
              <GoogleLogo className="absolute left-4 h-6 w-6 transition-all [&>path]:transition-colors group-hover:[&>path]:fill-white" />
              Continue with Google
            </Button>
            <Button className="group relative hover:bg-github" type="button" variant="outlined" onClick={() => handleSignInWithGithub()}>
              <GithubLogo className="absolute left-4 h-6 w-6 transition-all [&>path]:transition-colors group-hover:[&>path]:fill-white" />
              Continue with Github
            </Button>
          </div>
          {/* Create Account */}
          <p className="text-sm text-zinc-800">
            Don&apos;t have an account?{" "}
            <Link className="mb-4 mt-1 w-fit text-zinc-500 hover:underline" to="/sign-up">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
