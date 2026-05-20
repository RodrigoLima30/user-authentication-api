import "dotenv/config.js";
import { prisma } from "../../lib/prisma/prisma.js";
import { UserAlreadyExistError } from "../errors/user-already-exist-error.js";

interface IProfileUseCasesRequest {
  userId: string;
}

interface IProfileUseCasesResponse {
  user: {
    id: string;
    email: string;
    createdAt: Date;
  }
}

export async function profileUseCase({
  userId,
}: IProfileUseCasesRequest): Promise<IProfileUseCasesResponse> {

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    throw new UserAlreadyExistError();
  }

  return { user: { id: userExists.id, email: userExists.email, createdAt: userExists.createdAt } };
}
