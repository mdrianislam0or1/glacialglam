import express from 'express';
import { UserControllers } from './user.controller';
import { admin, protect } from '../../middlewares/authMiddleware';

const router = express.Router();

// Create a new user
router.post('/register', UserControllers.registerUser);
router.post('/auth', UserControllers.authUser);
router.post('/logout', UserControllers.logoutUser);
router.get('/profile', protect, UserControllers.getUserProfile);
router.put('/profile', protect, UserControllers.updateUserProfile);
router.delete('/:id', protect, admin, UserControllers.deleteUser);
router.get('/', protect, admin, UserControllers.getUsers);

router.get('/:id', protect, admin, UserControllers.getUserById);
router.put('/:id', protect, admin, UserControllers.updateUser);

export const UserRoutes = router;
