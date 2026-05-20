import { type Request, type Response } from "express";
import { z } from "zod";
import { UnauthorizedError } from "../../app/errors/unaouthorized-error.js";
import { signInUseCases } from "../../app/use-cases/sign-in-usecase.js";


const schemaSignInRequestBody = z.object({
    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long"),
  });

export async function signInController(req: Request, res: Response) {

  try {
    const { email, password } = schemaSignInRequestBody.parse(req.body);

    const data = await signInUseCases({ email, password });

    return res.status(200).send({ data });
  } catch (error) {

    if (error instanceof UnauthorizedError) {
      return res.status(401).send({ message: error.message });
    }
  }
}
