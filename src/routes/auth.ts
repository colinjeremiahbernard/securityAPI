import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middleware/checkJwt';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
// Attach our authentication route.
router.post('/login', asyncHandler(AuthController.login));

// Attach our change password route. Note that checkJwt enforces endpoint authorization.
router.post('/change-password', [checkJwt], asyncHandler(AuthController.changePassword));

export default router;