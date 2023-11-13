import express from 'express';
import { signin, signup } from '../../controllers/user-controller.js';

export const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export {router as v1ApiRoutes}