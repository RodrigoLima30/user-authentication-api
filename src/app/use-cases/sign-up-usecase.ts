import { hashSync } from "bcrypt";
import "dotenv/config.js";
import { prisma } from "../../lib/prisma/prisma.js";
import { UserAlreadyExistError } from "../errors/user-already-exist-error.js";

interface ISignUpUseCasesRequest {
  email: string;
  password: string;
}

interface ISignUpUseCasesResponse {
  user: {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
  };
}

export async function signUpUseCases({
  email,
  password,
}: ISignUpUseCasesRequest): Promise<ISignUpUseCasesResponse> {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new UserAlreadyExistError();
  }

  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  const hashedPassword = hashSync(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { user };
}
