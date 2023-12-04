import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Create a new user
router.post('/register', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.post('/login', UserControllers.login);
router.get('/:userId', UserControllers.getSingleUser);
// Update a single user by ID
router.put('/:userId', UserControllers.updateSingleUser);
// Delete a single user
router.delete('/:userId', UserControllers.deleteSingleUser);
export const UserRoutes = router;
