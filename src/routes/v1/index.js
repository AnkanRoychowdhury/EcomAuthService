import express from 'express';
import { isAuthenticated, signin, signup } from '../../controllers/user-controller.js';

export const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/authenticates', isAuthenticated);

export {router as v1ApiRoutes}