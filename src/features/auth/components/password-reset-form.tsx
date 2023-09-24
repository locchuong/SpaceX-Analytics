import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CheckCircleIcon from "~/assets/icons/check-circle.svg?react";

import { Alert, AlertDescription, AlertTitle } from "~/components/alert";
import { Button } from "~/components/button";
import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/input";

import { firebaseAuth } from "~/config/firebase";

import { convertErrorCodeToUserMessage } from "~/features/auth/constants/auth-errors";

import { Link } from "~/router";

const formSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
});

function PasswordResetForm() {
  const [sendPasswordResetEmail, , formError] = useSendPasswordResetEmail(firebaseAuth);
  const [showConfirmation, setShowConfirmation] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  function handleSendPasswordResetEmail(values: z.infer<typeof formSchema>) {
    sendPasswordResetEmail(values.email).then((success) => {
      if (success) {
        setShowConfirmation(true);
      }
      form.reset();
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.handleSubmit(handleSendPasswordResetEmail)(e);
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="min-h-[548px]">
        {/* Header */}
        <h1 className="mb-2 text-2xl font-medium tracking-wider">RECOVER PASSWORD</h1>
        {showConfirmation ? (
          <Alert variant="success" className="mb-3">
            <CheckCircleIcon className="h-5 w-5" />
            <AlertTitle>Check your email.</AlertTitle>
            <AlertDescription>We emailed you instructions to reset your password.</AlertDescription>
          </Alert>
        ) : (
          <p className="mb-6 text-sm text-zinc-500">Please enter your email:</p>
        )}
        <div className="space-y-6">
          {/* Password Reset Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              {(formError as AuthError)?.code && <FormError>{convertErrorCodeToUserMessage((formError as AuthError)?.code)}</FormError>}
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
              <Button className="w-full" type="submit">
                SEND INSTRUCTIONS
              </Button>
            </form>
          </Form>
          {/* Back Button */}
          <p className="text-sm text-zinc-800">
            Remember your password?{" "}
            <Link className="mb-4 mt-1 w-fit text-zinc-500 hover:underline" to="/login">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetForm;
