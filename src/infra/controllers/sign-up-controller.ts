import { type Request, type Response } from "express";
import { z } from "zod";
import { UserAlreadyExistError } from "../../app/errors/user-already-exist-error.js";
import { signUpUseCases } from "../../app/use-cases/sign-up-usecase.js";

export async function signUpController(req: Request, res: Response) {

  const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long"),
  });

  try {
    const { email, password } = signUpSchema.parse(req.body);

    const { user } = await signUpUseCases({ email, password });

    return res.status(201).send({ user });
  } catch (error) {

    if (error instanceof UserAlreadyExistError) {
      return res.status(409).send({ message: error.message });
    }
  }
}
