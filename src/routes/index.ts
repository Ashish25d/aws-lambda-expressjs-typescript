import { Router } from 'express';
import homeRoute from '../routes/home';

const router = Router();

router.use('/', homeRoute)

export default router;

