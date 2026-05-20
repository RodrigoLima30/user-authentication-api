import { compare, hashSync } from "bcrypt";
import "dotenv/config.js";
import { prisma } from "../../lib/prisma/prisma.js";
import jwt from "jsonwebtoken";
import { UserAlreadyExistError } from "../errors/user-already-exist-error.js";
import { UnauthorizedError } from "../errors/unaouthorized-error.js";

interface ISignInUseCasesRequest {
  email: string;
  password: string;
}

interface ISignInUseCasesResponse {
  user: {
    email: string;
  },
  token: string;
}

export async function signInUseCases({
  email,
  password,
}: ISignInUseCasesRequest): Promise<ISignInUseCasesResponse> {

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists) {
    throw new UserAlreadyExistError();
  }

  const matchPassword = await compare(password, userExists.password);

  if (!matchPassword) {
    throw new UnauthorizedError;
  }

  const JWT_SECRET = String(process.env.JWT_SECRET);
  const token = jwt.sign (
    {
    sub: userExists.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  )

  return { user: { email: userExists.email }, token };
}
