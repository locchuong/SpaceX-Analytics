import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "~/router";

import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/input";

import { firebaseAuth } from "~/config/firebase";

const formSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
});

function LoginForm() {
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(firebaseAuth);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signInWithEmailAndPassword(values.email, values.password).then((user) => {
      if (user) {
        navigate("/protected");
      }
    });
  }

  return (
    <div className="px-10">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-8"
        >
          <FormError>{error?.message}</FormError>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage>test</FormMessage>
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
