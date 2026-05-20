import { type Request, type Response } from "express";
import { z } from "zod";
import { profileUseCase } from "../../app/use-cases/profile-usecase.js";
import { UserAlreadyExistError } from "../../app/errors/user-already-exist-error.js";

const schemaProfileRequestBody = z.object({
    userId: z.string().uuid("Invalid user ID"),
  });

export async function profileController(req: Request, res: Response) {

  try {
    const { userId } = schemaProfileRequestBody.parse(req);

    const data = await profileUseCase({ userId });

    return res.status(200).send({ data });
  } catch (error) {

    if (error instanceof UserAlreadyExistError) {
      return res.status(404).send({ message: error.message });
    }
  }
}
