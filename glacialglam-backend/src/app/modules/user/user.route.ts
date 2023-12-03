import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Create a new user
router.post('/register', UserControllers.createUser);

export const UserRoutes = router;
