import express from 'express';
import controller from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const userRoutes = express.Router();

userRoutes.post('/register', controller.rUser);
userRoutes.post('/login', controller.auth);

userRoutes.get('/', controller.lUser);
userRoutes.put('/:id', controller.uUser);
// userRoutes.delete('/:id', auth, controller.dUser);

export default userRoutes;

