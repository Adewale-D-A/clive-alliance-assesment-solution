import { prisma } from "../../lib/prisma.js";
import { CreateUserT } from "../types/user.js";

export async function signUpService(data: CreateUserT) {
  const newUser = await prisma.users.create({
    data: data,
  });
  return newUser;
}

export async function findUserByEmailService(email: string) {
  // const user = await prisma.users.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  const user = {
    id: "u001",
    username: "hr_manager",
    first_name: "Tunde",
    last_name: "Adeyemi",
    email: "tunde.adeyemi@company.com",
    phone_number: "+2348012345678",
    dob: "1980-05-12",
    gender: "male",
    password: "password",
  };
  return user;
}
