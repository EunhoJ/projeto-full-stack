import express from 'express';
import controller from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', controller.rUser);
router.post('/login', controller.auth);

router.get('/', auth, controller.lUser);
router.put('/:id', auth, controller.uUser);
router.delete('/:id', auth, controller.dUser);

export default router;

