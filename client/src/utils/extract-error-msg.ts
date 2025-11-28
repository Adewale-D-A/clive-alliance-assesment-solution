export default function extractErrMssg(data: {
  message: any;
  detail: string;
  status: string;
  errors: { type: string; msg: string }[];
  data: { message: any; errors: any };
}) {
  try {
    const values =
      typeof data?.errors === "object"
        ? Object.values(data?.errors?.map((item) => item?.msg)).join(", ")
        : typeof data?.data?.message === "object"
        ? Object.values(data?.data?.message).join(", ")
        : typeof data?.data?.errors === "object"
        ? Object.values(data?.data?.errors).join(", ")
        : typeof data?.data === "object"
        ? Object.values(data?.data).join(", ")
        : data?.message || data?.detail || data?.status;
    return typeof values === "string" ? values : "Please try again later";
  } catch (error) {
    return "Please try again later";
  }
}
