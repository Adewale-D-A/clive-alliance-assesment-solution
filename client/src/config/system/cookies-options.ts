export const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: true,
  priority: "high" as const,
  maxAge: 86400, //24hrs
};
