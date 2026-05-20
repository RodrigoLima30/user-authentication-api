import { Router } from 'express';
import { signUpController } from '../controllers/sign-up-controller.js';
import { profileController } from '../controllers/profile-controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { signInController } from '../controllers/sign-in-controller.js';


export const router = Router();

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.get('/profile', isAuth, profileController);

