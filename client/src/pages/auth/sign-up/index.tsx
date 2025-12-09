import { useCallback, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/_shared/select";
import SignUpCompletedModal from "../../../components/info-modal/sign-up-completed";
import { useNavigate } from "react-router-dom";
import { formatDateToString } from "../../../utils/dates/isoDateConverter";

const today = formatDateToString(new Date());

export default function SignUpPage() {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { signUp } = useAuthentication();

  const [open, setOpen] = useState(false);

  const triggerModal = useCallback((val: boolean) => {
    setOpen(val);
  }, []);

  const closeModal = useCallback(() => {
    router("/");
  }, []);

  // Reset Store
  useEffect(() => {
    dispatch({ type: "RESET_STORE" });
  }, []);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <Form {...signUp.form}>
          <form
            onSubmit={signUp.form.handleSubmit((e) =>
              signUp.submit(e, triggerModal)
            )}
            className="w-full max-w-5xl bg-white shadow-lg p-8 rounded-lg space-y-4"
          >
            <div className="text-center mb-8 space-y-3 flex flex-col items-center">
              <Logo />
              <p className="text-gray-600">
                Sign up, onboard to your banking experience
              </p>
            </div>
            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormField
                name="first_name"
                control={signUp.form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="last_name"
                control={signUp.form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={signUp.form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dob"
                control={signUp.form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Date of birth"
                        max={today}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUp.form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-600">
                      Gender
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[50vh]" position="popper">
                        <SelectGroup>
                          {[
                            { label: "Male", value: "MALE" },
                            { label: "Female", value: "FEMALE" },
                          ].map((state) => (
                            <SelectItem value={state.value} key={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUp.form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-600">
                      Account Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[50vh]" position="popper">
                        <SelectGroup>
                          {[
                            { label: "Checking", value: "CHECKING" },
                            { label: "Savings", value: "SAVINGS" },
                          ].map((state) => (
                            <SelectItem value={state.value} key={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone_number"
                control={signUp.form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={signUp.form.control}
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
                control={signUp.form.control}
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
            </div>
            <Button
              isLoading={signUp.form?.formState?.isSubmitting}
              type="submit"
              className=" w-full mt-5"
            >
              Sign Up
            </Button>
            <p className=" text-center space-x-2">
              Already have an account?
              <Link
                to={"/"}
                className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black px-3"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
      <SignUpCompletedModal open={open} action={closeModal} />
    </>
  );
}
