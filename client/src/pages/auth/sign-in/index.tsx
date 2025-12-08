import { useEffect } from "react";
import { Button } from "../../../components/_shared/button";
import { Input } from "../../../components/_shared/input";
import useAuthentication from "../../../hooks/services/auth";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../../components/_shared/form";
import { useAppDispatch } from "../../../stores/store-hooks";
import { Logo } from "../../../components/logo";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const { signIn } = useAuthentication();

  // Reset Store
  useEffect(() => {
    dispatch({ type: "RESET_STORE" });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Form {...signIn.form}>
        <form
          onSubmit={signIn.form.handleSubmit(signIn.submit)}
          className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg space-y-4"
        >
          <div className="text-center mb-8 space-y-3 flex flex-col items-center">
            <Logo />
            <p className="text-gray-600">
              Sign in, continue your banking experience
            </p>
          </div>
          <FormField
            name="email"
            control={signIn.form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signIn.form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Link
              to={"/auth/reset-password/send-otp"}
              className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            isLoading={signIn.form?.formState?.isSubmitting}
            type="submit"
            className=" w-full mt-2"
          >
            Sign In
          </Button>
          <p className=" text-center space-x-2">
            New user?
            <Link
              to={"/auth/sign-up"}
              className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black px-3"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
