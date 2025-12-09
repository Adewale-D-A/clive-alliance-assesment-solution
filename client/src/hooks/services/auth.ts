import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  SignInSchema,
  SendOtpSchema,
  ResetPasswordSchema,
  UpdateProfileSchema,
  ChangePasswordSchema,
  SignUpSchema,
} from "../../config/schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "../../config/services/axios-context";
import axios from "axios";
import storeTokenClient from "../../utils/auth/store-token-client";
import storeProfileClient from "../../utils/auth/store-profile-client";
import { openInfobar } from "../../stores/features/app-native-features/info-modal";
import { useAppDispatch, useAppSelector } from "../../stores/store-hooks";
import { useNavigate } from "react-router-dom";

type SignInType = z.infer<typeof SignInSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type SendOtpType = z.infer<typeof SendOtpSchema>;
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export default function useAuthentication() {
  const customAxios = useAxios();
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth.value);

  const signInForm = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      gender: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      phone_number: "",
      dob: "",
    },
  });

  const sendOtpForm = useForm<SendOtpType>({
    resolver: zodResolver(SendOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      email: "",
      confirm_password: "",
    },
  });

  const profileForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: user?.email ?? "",
      gender: user?.gender ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      username: user?.username ?? "",
      phone_number: user?.phone_number ?? "",
      dob: user?.dob ?? "",
    },
  });

  const changePasswordForm = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const handleSignUpSubmit = async (
    data: SignUpSchemaType,
    onComplete: (val: boolean) => void
  ) => {
    try {
      // STEP 1: CREATE NEW USER
      await customAxios.post("/auth/sign-up", data);
      onComplete(true);
      // router("/");
    } catch (error) {}
  };

  const handleSignInSubmit = async (data: SignInType) => {
    try {
      const { email, password } = data;
      // STEP 1: LOGIN USER WITH AUTH CREDENTIALS
      const auth = await customAxios.post("/auth/sign-in", {
        email,
        password,
      });
      const { token, user } = auth.data?.data;

      // STEP 4: PERSIST TOKEN AND PROFILE ON CLIENT SIDE LOCAL STORAGE
      storeTokenClient({ token, refresh: "" });
      storeProfileClient({ profile: user });

      // STEP 5: REDIRECT USER SAFELY BASED ON ROLE
      router("/dashboard/home");
    } catch (error) {}
  };

  const handleSendOtpPassword = async (data: SendOtpType) => {
    const { email } = data;
    try {
      // const response = await axios.post("/auth/forgot-password", {
      //   email,
      // });
      // const { message } = response?.data;

      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: "A reset password link has been sent to your email", //"Reset code sent to your email"
        })
      );
      router(`/auth/reset-password/change-password?email=${email}`);
    } catch (error) {}
  };

  const handleResetPassword = async (data: ResetPasswordType) => {
    if (data?.password === data?.confirm_password) {
      // const { otp, password, confirm_password } = data;
      try {
        // await axios.post("/auth/reset-password", {
        //   token: otp,
        //   newPassword: password,
        //   email: email,
        //   password_confirmation: confirm_password,
        // });
        // console.log(email, otp, password, confirm_password);
        dispatch(
          openInfobar({
            render: "SuccessPrompt",
            message:
              "Password reset was successful, please login with your new password",
          })
        );
        router(`/auth/sign-in`);
      } catch (error: any) {}
    } else {
      dispatch(
        openInfobar({
          render: "ErrorPrompt",
          message: "Passwords do not match",
        })
      );
    }
  };

  const updateProfile = async (data: UpdateProfileSchemaType) => {
    try {
      const response = await axios.patch(`/users/update-profile/`, data);
      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: "Profile suceessfully updated",
        })
      );
    } catch (error) {}
  };

  const changePassword = async (data: ChangePasswordSchemaType) => {
    try {
      const response = await axios.patch(`/users/change-password/`, data);
      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: "Password suceessfully changed",
        })
      );
    } catch (error) {}
  };

  return {
    signIn: {
      form: signInForm,
      submit: handleSignInSubmit,
    },
    signUp: {
      form: signUpForm,
      submit: handleSignUpSubmit,
    },

    send_otp: {
      form: sendOtpForm,
      submit: handleSendOtpPassword,
    },
    reset_password: {
      form: resetPasswordForm,
      submit: handleResetPassword,
    },
    profile: {
      form: profileForm,
      submit: updateProfile,
    },
    change_password: {
      form: changePasswordForm,
      submit: changePassword,
    },
  };
}
