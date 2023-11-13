import { v1ApiRoutes } from './v1/index.js'
import express from 'express';

export const router = express.Router();

router.use('/v1', v1ApiRoutes);

export {router as ApiRoutes}