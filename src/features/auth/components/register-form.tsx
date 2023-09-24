import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/button";
import { Checkbox } from "~/components/checkbox";
import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/input";

import { firebaseAuth } from "~/config/firebase";

import { convertErrorCodeToUserMessage } from "~/features/auth/constants/auth-errors";

import { Link, useNavigate } from "~/router";

const formSchema = z
  .object({
    firstName: z.string().nonempty("First name is required."),
    lastName: z.string().nonempty("Last name is required."),
    email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
    password: z.string().nonempty("Password is required.").min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().nonempty("Password is required.").min(6, "Password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(firebaseAuth);
  const [updateProfile] = useUpdateProfile(firebaseAuth);

  const checkboxId = React.useId();
  const [hasAcceptedTerms, setHasAcceptedTerms] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  async function handleCreateUserWithEmailAndPassword(values: z.infer<typeof formSchema>) {
    await createUserWithEmailAndPassword(values.email, values.password).then(async (user) => {
      if (user) {
        await updateProfile({
          displayName: `${values.firstName} ${values.lastName}`,
        });
        navigate("/protected");
      }
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.handleSubmit(handleCreateUserWithEmailAndPassword)(e);
  }
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="min-h-[548px]">
        {/* Header */}
        <h1 className="mb-2 text-2xl font-medium tracking-wider">REGISTER</h1>
        <p className="mb-6 text-sm text-zinc-500">Please fill in the information below:</p>
        <div className="space-y-6">
          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              {error?.code && <FormError>{convertErrorCodeToUserMessage(error?.code)}</FormError>}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormLabel>First name</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormLabel>Last name</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-3 flex items-center space-x-2">
                <Checkbox id={checkboxId} checked={hasAcceptedTerms} onCheckedChange={(checked) => setHasAcceptedTerms(!!checked)} />
                <label className="text-xs text-zinc-500" htmlFor={checkboxId}>
                  By signing up, you are accepting{" "}
                  <a className="text-blue-500" href="#main">
                    SpaceX terms and conditions.
                  </a>
                </label>
              </div>
              <Button className="w-full" type="submit" disabled={!hasAcceptedTerms}>
                CREATE MY ACCOUNT
              </Button>
            </form>
          </Form>
          {/* Sign In */}
          <p className="text-sm text-zinc-800">
            Already have an account?{" "}
            <Link className="mb-4 mt-1 w-fit text-zinc-500 hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
